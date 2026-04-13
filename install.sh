#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$HOME/.claude/skills"

echo "=== PM Skills Installer ==="
echo ""

# Check dependencies
echo "Checking dependencies..."

if ! command -v python3 &>/dev/null; then
  echo "ERROR: python3 not found. Please install Python 3."
  exit 1
fi
echo "  ✓ python3"

if ! command -v node &>/dev/null; then
  echo "WARNING: node not found. /pm-build preview generation won't work without Node.js."
else
  echo "  ✓ node"
fi

if ! command -v claude &>/dev/null; then
  echo "WARNING: claude CLI not found. Skills won't be usable without Claude Code."
else
  echo "  ✓ claude"
fi

echo ""

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r "$SCRIPT_DIR/scripts/requirements.txt" --quiet
echo "  ✓ Python packages installed"
echo ""

# Symlink skills
echo "Symlinking skills into $SKILLS_DIR ..."
mkdir -p "$SKILLS_DIR"

for skill_dir in "$SCRIPT_DIR"/skills/*/; do
  skill_name="$(basename "$skill_dir")"
  target="$SKILLS_DIR/$skill_name"
  if [ -L "$target" ]; then
    rm "$target"
  fi
  ln -s "$skill_dir" "$target"
  echo "  ✓ $skill_name → $target"
done

echo ""

# Optional: Mobbin MCP setup
read -p "Do you have a Mobbin Pro account for UI screenshot references? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo "To set up Mobbin MCP, you'll need your session cookie from mobbin.com."
  echo "1. Log into mobbin.com in your browser"
  echo "2. Open DevTools → Application → Cookies → copy the 'session' cookie value"
  echo ""
  read -p "Enter your Mobbin session cookie (or press Enter to skip): " MOBBIN_COOKIE
  if [ -n "$MOBBIN_COOKIE" ]; then
    claude mcp add mobbin-mcp -- npx -y @anthropic/mobbin-mcp --session-cookie "$MOBBIN_COOKIE" 2>/dev/null || {
      echo "WARNING: Could not add Mobbin MCP. You can set it up manually later."
      echo "Run: claude mcp add mobbin-mcp -- npx -y @anthropic/mobbin-mcp --session-cookie YOUR_COOKIE"
    }
    echo "  ✓ Mobbin MCP configured"
  else
    echo "  Skipped Mobbin setup. You can run this installer again to set it up later."
  fi
else
  echo "  Skipped Mobbin setup."
fi

echo ""
echo "=== Installation complete! ==="
echo ""
echo "Available skills:"
echo "  /pm-research <product-name> [--idea \"...\"]  — Research a product"
echo "  /pm-design <project-name>                    — Design from research"
echo "  /pm-build <persona> [--project <name>]       — Build prototype"
echo "  /pm-package [--format email|blog|lovable|all] — Package deliverables"
echo ""
echo "Start a new Claude Code session or run /clear, then type /pm-research to begin."
