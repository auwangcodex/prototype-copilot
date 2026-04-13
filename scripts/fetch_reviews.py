#!/usr/bin/env python3
"""
App Store Review Scraper

Fetches and analyzes App Store reviews for a given app, outputting structured
markdown with star distribution, sentiment themes, and key insights.
"""

import argparse
import sys
from collections import defaultdict, Counter
from typing import List, Dict, Tuple
import re

try:
    from app_store_web_scraper import AppStore
except ImportError:
    print("Error: app-store-web-scraper package not installed.", file=sys.stderr)
    print("Install it with: pip install app-store-web-scraper", file=sys.stderr)
    sys.exit(1)


# Theme keywords for sentiment clustering
THEME_KEYWORDS = {
    "battery_life": ["battery", "drain", "power", "charge", "charging"],
    "accuracy": ["accurate", "accuracy", "inaccurate", "wrong", "correct", "precise", "precision"],
    "ui_ux": ["interface", "ui", "ux", "design", "layout", "navigation", "menu", "button"],
    "performance": ["slow", "fast", "lag", "crash", "freeze", "performance", "speed", "responsive"],
    "features": ["feature", "function", "capability", "option", "missing", "need", "want"],
    "privacy": ["privacy", "data", "tracking", "permission", "secure", "security"],
    "ads": ["ad", "ads", "advertisement", "subscription", "paywall", "premium"],
    "bugs": ["bug", "glitch", "issue", "problem", "error", "broken", "fix"],
    "updates": ["update", "version", "latest", "new", "change", "improvement"],
    "support": ["support", "help", "customer service", "response", "contact"],
    "value": ["price", "cost", "worth", "expensive", "cheap", "free", "money", "value"],
    "ease_of_use": ["easy", "simple", "intuitive", "complicated", "difficult", "confusing"],
}


def search_app_id(app_name: str, country: str = "us") -> int:
    """Search for an app ID by name."""
    try:
        # Use AppStore search functionality
        app_store = AppStore(country=country, app_name=app_name, app_id=0)
        # Try to fetch minimal data to validate
        app_store.review(how_many=1)

        # If the above doesn't error, we need to actually search
        # The library doesn't have built-in search, so we'll require app_id
        raise ValueError(f"Unable to auto-search for '{app_name}'. Please provide --app-id")

    except Exception as e:
        raise ValueError(f"Error searching for app '{app_name}': {str(e)}")


def fetch_reviews(app_name: str, app_id: int, country: str, max_reviews: int) -> List[Dict]:
    """Fetch reviews from the App Store."""
    try:
        app_store = AppStore(country=country, app_name=app_name, app_id=app_id)
        app_store.review(how_many=max_reviews)
        return app_store.reviews
    except Exception as e:
        raise RuntimeError(f"Error fetching reviews: {str(e)}")


def calculate_star_distribution(reviews: List[Dict]) -> Dict[int, int]:
    """Calculate the distribution of star ratings."""
    distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for review in reviews:
        rating = review.get("rating", 0)
        if 1 <= rating <= 5:
            distribution[rating] += 1
    return distribution


def match_themes(text: str) -> List[str]:
    """Match review text to theme keywords."""
    text_lower = text.lower()
    matched_themes = []

    for theme, keywords in THEME_KEYWORDS.items():
        for keyword in keywords:
            if re.search(r'\b' + re.escape(keyword) + r'\b', text_lower):
                matched_themes.append(theme)
                break  # Only count each theme once per review

    return matched_themes


def extract_themes(reviews: List[Dict], min_rating: int = 1, max_rating: int = 5) -> Counter:
    """Extract themes from reviews within a rating range."""
    theme_counter = Counter()

    for review in reviews:
        rating = review.get("rating", 0)
        if min_rating <= rating <= max_rating:
            review_text = review.get("review", "")
            title = review.get("title", "")
            combined_text = f"{title} {review_text}"

            themes = match_themes(combined_text)
            theme_counter.update(themes)

    return theme_counter


def get_example_reviews_by_theme(reviews: List[Dict], theme: str, limit: int = 3) -> List[str]:
    """Get example review snippets for a given theme."""
    examples = []
    theme_keywords = THEME_KEYWORDS.get(theme, [])

    for review in reviews:
        review_text = review.get("review", "")
        title = review.get("title", "")
        combined_text = f"{title} {review_text}"

        # Check if this review matches the theme
        text_lower = combined_text.lower()
        for keyword in theme_keywords:
            if re.search(r'\b' + re.escape(keyword) + r'\b', text_lower):
                # Extract a snippet around the keyword
                snippet = title if title else review_text[:100]
                examples.append(f'"{snippet}..."')
                break

        if len(examples) >= limit:
            break

    return examples


def format_theme_name(theme: str) -> str:
    """Format theme name for display."""
    return theme.replace("_", " ").title()


def generate_markdown_report(app_name: str, app_id: int, country: str, reviews: List[Dict]) -> str:
    """Generate a markdown report from reviews."""
    if not reviews:
        return f"# App Store Reviews: {app_name}\n\nNo reviews found."

    total_reviews = len(reviews)
    star_dist = calculate_star_distribution(reviews)

    # Build report
    lines = [
        f"# App Store Reviews: {app_name}",
        f"",
        f"**App ID:** {app_id}  ",
        f"**Country:** {country.upper()}  ",
        f"**Reviews Analyzed:** {total_reviews}",
        f"",
        f"## Star Distribution",
        f"",
    ]

    # Star distribution with bar chart
    max_count = max(star_dist.values()) if star_dist.values() else 1
    for stars in range(5, 0, -1):
        count = star_dist[stars]
        percentage = (count / total_reviews * 100) if total_reviews > 0 else 0
        bar_length = int((count / max_count) * 30) if max_count > 0 else 0
        bar = "█" * bar_length
        lines.append(f"{stars} ⭐: {count:4d} ({percentage:5.1f}%) {bar}")

    lines.append("")

    # Negative themes (1-3 stars)
    negative_themes = extract_themes(reviews, min_rating=1, max_rating=3)
    lines.extend([
        "## Top 5 Complaints",
        "",
    ])

    if negative_themes:
        for theme, count in negative_themes.most_common(5):
            percentage = (count / total_reviews * 100) if total_reviews > 0 else 0
            lines.append(f"### {format_theme_name(theme)} ({count} mentions, {percentage:.1f}%)")
            examples = get_example_reviews_by_theme(
                [r for r in reviews if 1 <= r.get("rating", 0) <= 3],
                theme,
                limit=2
            )
            for example in examples:
                lines.append(f"- {example}")
            lines.append("")
    else:
        lines.append("No significant complaint themes detected.")
        lines.append("")

    # Positive themes (4-5 stars)
    positive_themes = extract_themes(reviews, min_rating=4, max_rating=5)
    lines.extend([
        "## Top 5 Praise Themes",
        "",
    ])

    if positive_themes:
        for theme, count in positive_themes.most_common(5):
            percentage = (count / total_reviews * 100) if total_reviews > 0 else 0
            lines.append(f"### {format_theme_name(theme)} ({count} mentions, {percentage:.1f}%)")
            examples = get_example_reviews_by_theme(
                [r for r in reviews if 4 <= r.get("rating", 0) <= 5],
                theme,
                limit=2
            )
            for example in examples:
                lines.append(f"- {example}")
            lines.append("")
    else:
        lines.append("No significant praise themes detected.")
        lines.append("")

    # Overall sentiment clustering
    all_themes = extract_themes(reviews, min_rating=1, max_rating=5)
    lines.extend([
        "## Sentiment Clustering (All Reviews)",
        "",
    ])

    if all_themes:
        for theme, count in all_themes.most_common(10):
            percentage = (count / total_reviews * 100) if total_reviews > 0 else 0
            lines.append(f"- **{format_theme_name(theme)}**: {count} mentions ({percentage:.1f}%)")
    else:
        lines.append("No themes detected.")

    lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Scrape and analyze App Store reviews",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --app-name "Instagram" --app-id 389801252 --max-reviews 500
  %(prog)s --app-name "WhatsApp" --app-id 310633997 --country uk --max-reviews 100
        """
    )

    parser.add_argument(
        "--app-name",
        type=str,
        required=True,
        help="Name of the app (used for display and search)"
    )

    parser.add_argument(
        "--app-id",
        type=int,
        default=None,
        help="App Store ID (numeric). Required for fetching reviews."
    )

    parser.add_argument(
        "--country",
        type=str,
        default="us",
        help="Two-letter country code (default: us)"
    )

    parser.add_argument(
        "--max-reviews",
        type=int,
        default=200,
        help="Maximum number of reviews to fetch (default: 200)"
    )

    args = parser.parse_args()

    # Validate app_id
    if args.app_id is None:
        print(f"Error: --app-id is required. Please provide the numeric App Store ID for '{args.app_name}'",
              file=sys.stderr)
        print(f"You can find the app ID in the App Store URL.", file=sys.stderr)
        sys.exit(1)

    try:
        # Fetch reviews
        print(f"Fetching up to {args.max_reviews} reviews for {args.app_name} (ID: {args.app_id})...",
              file=sys.stderr)
        reviews = fetch_reviews(args.app_name, args.app_id, args.country, args.max_reviews)
        print(f"Successfully fetched {len(reviews)} reviews.", file=sys.stderr)
        print("", file=sys.stderr)

        # Generate and output report
        report = generate_markdown_report(args.app_name, args.app_id, args.country, reviews)
        print(report)

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
