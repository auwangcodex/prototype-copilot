import React, { useState } from 'react';

/**
 * Product Prototype Scaffold
 *
 * A single-file React component for building interactive product prototypes.
 * Customize the design tokens at the top and the content sections below.
 *
 * Structure:
 * - Design System (CSS variables)
 * - iPhone Frame Wrapper
 * - Goal Banner
 * - Status Cards
 * - Coach Section
 * - Game Plan Timeline
 * - Activity Log
 * - Interactive Elements (Photo Capture, Voice Input, Chat)
 */

export default function PrototypeScaffold() {
  // Interactive state
  const [photoState, setPhotoState] = useState('empty'); // empty | camera | captured
  const [voiceState, setVoiceState] = useState('idle'); // idle | listening | processing | done
  const [chatOpen, setChatOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  // Toggle game plan item completion
  const toggleItem = (id) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  // Photo capture sequence
  const handlePhotoClick = () => {
    if (photoState === 'empty') {
      setPhotoState('camera');
      setTimeout(() => setPhotoState('captured'), 1200);
    } else if (photoState === 'captured') {
      setPhotoState('empty');
    }
  };

  // Voice input sequence
  const handleVoiceClick = () => {
    if (voiceState === 'idle') {
      setVoiceState('listening');
      setTimeout(() => setVoiceState('processing'), 2000);
      setTimeout(() => setVoiceState('done'), 3500);
      setTimeout(() => setVoiceState('idle'), 5000);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        /* DESIGN SYSTEM TOKENS - Customize these for your product */
        :root {
          /* Colors - Update to match your brand */
          --color-primary: #6366f1;
          --color-secondary: #8b5cf6;
          --color-accent: #ec4899;
          --color-success: #10b981;
          --color-warning: #f59e0b;
          --color-error: #ef4444;

          /* Backgrounds */
          --bg-primary: #ffffff;
          --bg-secondary: #f9fafb;
          --bg-tertiary: #f3f4f6;
          --bg-dark: #111827;

          /* Text */
          --text-primary: #111827;
          --text-secondary: #6b7280;
          --text-tertiary: #9ca3af;
          --text-inverse: #ffffff;

          /* Typography */
          --font-heading: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;

          /* Spacing */
          --spacing-xs: 4px;
          --spacing-sm: 8px;
          --spacing-md: 16px;
          --spacing-lg: 24px;
          --spacing-xl: 32px;
          --spacing-2xl: 48px;

          /* Border Radius */
          --radius-sm: 6px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-xl: 24px;
          --radius-full: 9999px;

          /* Shadows */
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* iPhone Frame */}
      <div style={styles.phoneFrame}>
        {/* Status Bar */}
        <div style={styles.statusBar}>
          <span style={styles.time}>9:41</span>
          <div style={styles.statusIcons}>
            <span style={styles.statusIcon}>📶</span>
            <span style={styles.statusIcon}>📱</span>
            <span style={styles.statusIcon}>🔋</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={styles.content}>

          {/* GOAL BANNER - Customize with your product's primary metric */}
          <div style={styles.goalBanner}>
            <div style={styles.goalLabel}>MY GOAL</div>
            <div style={styles.goalValue}>8,500</div>
            <div style={styles.goalUnit}>steps today</div>
            <div style={styles.goalProgress}>
              <div style={{...styles.goalProgressFill, width: '67%'}} />
            </div>
            <div style={styles.streakBadge}>🔥 12 day streak</div>
          </div>

          {/* STATUS CARDS - Replace with your product's key metrics */}
          <div style={styles.statusSection}>
            <div style={styles.sectionTitle}>TODAY'S STATUS</div>
            <div style={styles.statusGrid}>

              {/* Status Card 1 */}
              <div style={styles.statusCard}>
                <div style={styles.cardIcon}>💧</div>
                <div style={styles.cardValue}>6/8</div>
                <div style={styles.cardLabel}>Glasses</div>
                <div style={{...styles.cardRing, borderColor: 'var(--color-primary)'}}>
                  <svg style={styles.ringProgress} viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="3"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                </div>
              </div>

              {/* Status Card 2 */}
              <div style={styles.statusCard}>
                <div style={styles.cardIcon}>🥗</div>
                <div style={styles.cardValue}>3/3</div>
                <div style={styles.cardLabel}>Meals</div>
                <div style={{...styles.cardRing, borderColor: 'var(--color-success)'}}>
                  <svg style={styles.ringProgress} viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--color-success)"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                  </svg>
                </div>
              </div>

              {/* Status Card 3 */}
              <div style={styles.statusCard}>
                <div style={styles.cardIcon}>😴</div>
                <div style={styles.cardValue}>7.2h</div>
                <div style={styles.cardLabel}>Sleep</div>
                <div style={{...styles.cardRing, borderColor: 'var(--color-secondary)'}}>
                  <svg style={styles.ringProgress} viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--color-secondary)"
                      strokeWidth="3"
                      strokeDasharray="90, 100"
                    />
                  </svg>
                </div>
              </div>

              {/* Status Card 4 */}
              <div style={styles.statusCard}>
                <div style={styles.cardIcon}>🧘</div>
                <div style={styles.cardValue}>15m</div>
                <div style={styles.cardLabel}>Mindful</div>
                <div style={{...styles.cardRing, borderColor: 'var(--color-accent)'}}>
                  <svg style={styles.ringProgress} viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="3"
                      strokeDasharray="50, 100"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* COACH SECTION - Customize personality and messaging */}
          <div style={styles.coachSection}>
            <div style={styles.sectionTitle}>YOUR COACH</div>
            <div style={styles.coachCard}>
              <div style={styles.coachAvatar}>
                <span style={styles.coachAvatarIcon}>🏃‍♂️</span>
              </div>
              <div style={styles.coachContent}>
                <div style={styles.coachName}>Alex</div>
                <div style={styles.coachMessage}>
                  "You're crushing it today! Just 2,000 more steps to hit your goal.
                  A quick walk after dinner will get you there. 💪"
                </div>
                <button
                  style={styles.coachButton}
                  onClick={() => setChatOpen(!chatOpen)}
                >
                  Chat with Alex
                </button>
              </div>
            </div>
          </div>

          {/* GAME PLAN - Daily action timeline */}
          <div style={styles.gamePlanSection}>
            <div style={styles.sectionTitle}>TODAY'S GAME PLAN</div>
            <div style={styles.timeline}>

              {[
                { id: 1, time: '7:00 AM', action: 'Morning hydration', duration: '1 min', icon: '💧' },
                { id: 2, time: '8:30 AM', action: 'Protein-rich breakfast', duration: '15 min', icon: '🍳' },
                { id: 3, time: '10:00 AM', action: 'Mid-morning walk', duration: '10 min', icon: '🚶' },
                { id: 4, time: '12:30 PM', action: 'Balanced lunch', duration: '20 min', icon: '🥗' },
                { id: 5, time: '3:00 PM', action: 'Afternoon water check', duration: '1 min', icon: '💧' },
                { id: 6, time: '6:00 PM', action: 'Evening workout', duration: '30 min', icon: '🏃' },
                { id: 7, time: '7:30 PM', action: 'Healthy dinner', duration: '25 min', icon: '🍽️' },
                { id: 8, time: '9:00 PM', action: 'Wind-down routine', duration: '15 min', icon: '📖' },
                { id: 9, time: '10:00 PM', action: 'Bedtime reflection', duration: '5 min', icon: '🧘' },
              ].map(item => (
                <div
                  key={item.id}
                  style={styles.timelineItem}
                  onClick={() => toggleItem(item.id)}
                >
                  <div style={styles.timelineTime}>{item.time}</div>
                  <div style={{
                    ...styles.timelineCheckbox,
                    backgroundColor: checkedItems.has(item.id) ? 'var(--color-success)' : 'transparent',
                  }}>
                    {checkedItems.has(item.id) && <span>✓</span>}
                  </div>
                  <div style={styles.timelineContent}>
                    <div style={styles.timelineIcon}>{item.icon}</div>
                    <div>
                      <div style={styles.timelineAction}>{item.action}</div>
                      <div style={styles.timelineDuration}>{item.duration}</div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* ACTIVITY LOG - Customize capture mechanisms */}
          <div style={styles.logSection}>
            <div style={styles.sectionTitle}>MY LOG</div>

            {/* Photo Capture Element */}
            <div style={styles.logCard}>
              <div style={styles.logLabel}>📸 Log your meal</div>
              <div
                style={styles.photoCapture}
                onClick={handlePhotoClick}
              >
                {photoState === 'empty' && (
                  <div style={styles.photoCaptureEmpty}>
                    <div style={styles.photoCaptureIcon}>📷</div>
                    <div style={styles.photoCaptureText}>Tap to capture</div>
                  </div>
                )}
                {photoState === 'camera' && (
                  <div style={styles.photoCaptureCamera}>
                    <div style={styles.cameraAnimation}>📸</div>
                    <div style={styles.photoCaptureText}>Taking photo...</div>
                  </div>
                )}
                {photoState === 'captured' && (
                  <div style={styles.photoCaptureDone}>
                    <div style={styles.capturedCheckmark}>✓</div>
                    <div style={styles.photoCaptureText}>Meal logged! Tap to reset</div>
                  </div>
                )}
              </div>
            </div>

            {/* Voice Input Element */}
            <div style={styles.logCard}>
              <div style={styles.logLabel}>🎤 Quick voice note</div>
              <button
                style={{
                  ...styles.voiceButton,
                  backgroundColor:
                    voiceState === 'listening' ? 'var(--color-error)' :
                    voiceState === 'processing' ? 'var(--color-warning)' :
                    voiceState === 'done' ? 'var(--color-success)' :
                    'var(--color-primary)'
                }}
                onClick={handleVoiceClick}
                disabled={voiceState !== 'idle'}
              >
                <div style={styles.voiceButtonContent}>
                  {voiceState === 'idle' && (
                    <>
                      <span style={styles.voiceIcon}>🎤</span>
                      <span>Tap to speak</span>
                    </>
                  )}
                  {voiceState === 'listening' && (
                    <>
                      <span style={styles.voiceIconAnimated}>●</span>
                      <span>Listening...</span>
                    </>
                  )}
                  {voiceState === 'processing' && (
                    <>
                      <span style={styles.voiceIconAnimated}>⋯</span>
                      <span>Processing...</span>
                    </>
                  )}
                  {voiceState === 'done' && (
                    <>
                      <span>✓</span>
                      <span>Saved!</span>
                    </>
                  )}
                </div>
              </button>
            </div>

          </div>

          {/* Bottom padding for safe area */}
          <div style={{ height: 'var(--spacing-2xl)' }} />

        </div>

        {/* Chat Overlay */}
        {chatOpen && (
          <div style={styles.chatOverlay}>
            <div style={styles.chatHeader}>
              <button
                style={styles.chatClose}
                onClick={() => setChatOpen(false)}
              >
                ✕
              </button>
              <div style={styles.chatHeaderTitle}>
                <div style={styles.chatAvatar}>🏃‍♂️</div>
                <div>
                  <div style={styles.chatHeaderName}>Alex</div>
                  <div style={styles.chatHeaderStatus}>Your motivational coach</div>
                </div>
              </div>
            </div>
            <div style={styles.chatMessages}>
              <div style={styles.chatMessageBot}>
                <div style={styles.chatMessageBubble}>
                  Hey! How can I help you stay on track today?
                </div>
              </div>
            </div>
            <div style={styles.chatInput}>
              <input
                style={styles.chatInputField}
                placeholder="Type your message..."
              />
              <button style={styles.chatSendButton}>Send</button>
            </div>
          </div>
        )}

        {/* Home Indicator */}
        <div style={styles.homeIndicator} />
      </div>
    </div>
  );
}

/* STYLES - Organized by section */
const styles = {
  // Container
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-secondary)',
    padding: 'var(--spacing-lg)',
    fontFamily: 'var(--font-body)',
  },

  // Phone Frame
  phoneFrame: {
    width: '393px',
    maxWidth: '100%',
    height: '852px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: 'var(--spacing-2xl)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },

  // Status Bar
  statusBar: {
    height: '44px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 var(--spacing-lg)',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  time: {},
  statusIcons: {
    display: 'flex',
    gap: 'var(--spacing-xs)',
  },
  statusIcon: {
    fontSize: '12px',
  },

  // Content Area
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 var(--spacing-md)',
  },

  // Section Titles
  sectionTitle: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: 'var(--text-tertiary)',
    marginBottom: 'var(--spacing-md)',
    textTransform: 'uppercase',
  },

  // Goal Banner
  goalBanner: {
    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    color: 'var(--text-inverse)',
    textAlign: 'center',
    marginBottom: 'var(--spacing-lg)',
    position: 'relative',
  },
  goalLabel: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    opacity: 0.9,
    marginBottom: 'var(--spacing-xs)',
  },
  goalValue: {
    fontSize: '48px',
    fontWeight: '700',
    lineHeight: '1',
    marginBottom: 'var(--spacing-xs)',
  },
  goalUnit: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: 'var(--spacing-md)',
  },
  goalProgress: {
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
    marginBottom: 'var(--spacing-md)',
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: 'var(--text-inverse)',
    borderRadius: 'var(--radius-full)',
    transition: 'width 0.3s ease',
  },
  streakBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: '600',
  },

  // Status Section
  statusSection: {
    marginBottom: 'var(--spacing-lg)',
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--spacing-md)',
  },
  statusCard: {
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md)',
    textAlign: 'center',
    position: 'relative',
  },
  cardIcon: {
    fontSize: '32px',
    marginBottom: 'var(--spacing-sm)',
  },
  cardValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-xs)',
  },
  cardLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  cardRing: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '36px',
    height: '36px',
  },
  ringProgress: {
    width: '100%',
    height: '100%',
    transform: 'rotate(-90deg)',
  },

  // Coach Section
  coachSection: {
    marginBottom: 'var(--spacing-lg)',
  },
  coachCard: {
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-md)',
    display: 'flex',
    gap: 'var(--spacing-md)',
  },
  coachAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  coachAvatarIcon: {
    fontSize: '28px',
  },
  coachContent: {
    flex: 1,
  },
  coachName: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-xs)',
  },
  coachMessage: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    marginBottom: 'var(--spacing-md)',
  },
  coachButton: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--text-inverse)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  // Game Plan Timeline
  gamePlanSection: {
    marginBottom: 'var(--spacing-lg)',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md)',
    cursor: 'pointer',
  },
  timelineTime: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--text-tertiary)',
    width: '60px',
    flexShrink: 0,
  },
  timelineCheckbox: {
    width: '20px',
    height: '20px',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--text-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-inverse)',
    fontSize: '12px',
    flexShrink: 0,
  },
  timelineContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    flex: 1,
  },
  timelineIcon: {
    fontSize: '20px',
  },
  timelineAction: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  timelineDuration: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },

  // Log Section
  logSection: {
    marginBottom: 'var(--spacing-lg)',
  },
  logCard: {
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-md)',
  },
  logLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-md)',
  },

  // Photo Capture
  photoCapture: {
    height: '160px',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px dashed var(--text-tertiary)',
  },
  photoCaptureEmpty: {
    textAlign: 'center',
  },
  photoCaptureIcon: {
    fontSize: '40px',
    marginBottom: 'var(--spacing-sm)',
  },
  photoCaptureText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  photoCaptureCamera: {
    textAlign: 'center',
  },
  cameraAnimation: {
    fontSize: '40px',
    marginBottom: 'var(--spacing-sm)',
    animation: 'pulse 1s infinite',
  },
  photoCaptureDone: {
    textAlign: 'center',
  },
  capturedCheckmark: {
    fontSize: '40px',
    color: 'var(--color-success)',
    marginBottom: 'var(--spacing-sm)',
  },

  // Voice Input
  voiceButton: {
    width: '100%',
    padding: 'var(--spacing-md)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-inverse)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  voiceButtonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
  },
  voiceIcon: {
    fontSize: '18px',
  },
  voiceIconAnimated: {
    fontSize: '18px',
    animation: 'pulse 1s infinite',
  },

  // Chat Overlay
  chatOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideUp 0.3s ease',
  },
  chatHeader: {
    padding: 'var(--spacing-md)',
    borderBottom: '1px solid var(--bg-tertiary)',
    position: 'relative',
  },
  chatClose: {
    position: 'absolute',
    top: 'var(--spacing-md)',
    right: 'var(--spacing-md)',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
  },
  chatHeaderTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    marginTop: 'var(--spacing-xl)',
  },
  chatAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  chatHeaderName: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  chatHeaderStatus: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--spacing-md)',
  },
  chatMessageBot: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 'var(--spacing-md)',
  },
  chatMessageBubble: {
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md)',
    maxWidth: '75%',
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
  chatInput: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-md)',
    borderTop: '1px solid var(--bg-tertiary)',
  },
  chatInputField: {
    flex: 1,
    padding: 'var(--spacing-md)',
    border: '1px solid var(--bg-tertiary)',
    borderRadius: 'var(--radius-md)',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
  },
  chatSendButton: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--text-inverse)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: '0 var(--spacing-lg)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  // Home Indicator
  homeIndicator: {
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
