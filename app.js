/**
 * RECALLER — Deep Recall & Focus Application
 * Minimal & Sophisticated Dual-Tone Black & White
 */

(function () {
  'use strict';

  // =========================================================================
  // DEFAULT SEED DATA
  // =========================================================================
  const DEFAULT_SETTINGS = {
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    soundEnabled: true,
    autoStart: false,
    theme: 'dark',
    highContrast: false,
  };

  const DEFAULT_DECKS = [
    {
      id: 'deck-cognitive',
      name: 'Cognitive Science & Recall',
      description: 'Core principles of human memory, consolidation, and retention.',
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: 'deck-mental-models',
      name: 'Essential Mental Models',
      description: 'Frameworks for strategic thinking and decision-making.',
      createdAt: Date.now() - 86400000,
    }
  ];

  const DEFAULT_CARDS = [
    {
      id: 'card-1',
      deckId: 'deck-cognitive',
      front: 'What is the "Testing Effect" (Retrieval Practice)?',
      back: 'The phenomenon where actively retrieving information from memory produces stronger and longer-lasting retention than passively re-reading the same material.',
      hint: 'Pioneered by Roediger & Karpicke (2006).',
      mastered: true,
      createdAt: Date.now() - 500000,
    },
    {
      id: 'card-2',
      deckId: 'deck-cognitive',
      front: 'How does Spaced Repetition leverage the Forgetting Curve?',
      back: 'By reviewing information at increasing intervals just as it is about to be forgotten, memory traces are reinforced with maximal neurological efficiency.',
      hint: 'Hermann Ebbinghaus (1885).',
      mastered: false,
      createdAt: Date.now() - 400000,
    },
    {
      id: 'card-3',
      deckId: 'deck-cognitive',
      front: 'What is Interleaving in study sessions?',
      back: 'Mixing multiple related topics or skills during practice rather than focusing on one topic in isolation. It improves discrimination and cognitive flexibility.',
      hint: 'Contrasted with "blocked" practice.',
      mastered: false,
      createdAt: Date.now() - 300000,
    },
    {
      id: 'card-4',
      deckId: 'deck-cognitive',
      front: 'Explain the Feynman Technique in four steps.',
      back: '1. Choose a concept.\n2. Teach it to a 10-year-old in plain language.\n3. Identify knowledge gaps.\n4. Review source material and simplify further.',
      hint: 'Simplicity reveals genuine understanding.',
      mastered: true,
      createdAt: Date.now() - 200000,
    },
    {
      id: 'card-5',
      deckId: 'deck-mental-models',
      front: 'What is First Principles Thinking?',
      back: 'Boiling a problem down to its most fundamental, immutable truths and reasoning upwards from there, rather than reasoning by analogy.',
      hint: 'Aristotle & Elon Musk.',
      mastered: false,
      createdAt: Date.now() - 100000,
    },
    {
      id: 'card-6',
      deckId: 'deck-mental-models',
      front: 'What is Inversion (Carl Jacobi)?',
      back: 'Approaching problems backwards by thinking about what you want to avoid rather than what you want to achieve ("Invert, always invert").',
      hint: 'Avoid stupidity before trying to be brilliant.',
      mastered: true,
      createdAt: Date.now() - 50000,
    }
  ];

  const DEFAULT_QUIZZES = [
    {
      id: 'quiz-memory-science',
      title: 'The Science of Memory & Recall',
      description: 'Examine your understanding of evidence-based learning principles.',
      questions: [
        {
          id: 'q-1',
          prompt: 'Which learning strategy yields the highest long-term retention according to cognitive research?',
          options: [
            'Re-reading highlighed textbook chapters',
            'Active retrieval practice through flashcards and self-testing',
            'Massed repetition before an exam (cramming)',
            'Listening to lecture recordings passively'
          ],
          correctIndex: 1,
          explanation: 'Active retrieval forces the brain to reconstruct memory pathways, creating far stronger neural consolidation than passive review.'
        },
        {
          id: 'q-2',
          prompt: 'What is the optimal timing for reviewing a card in a spaced repetition system?',
          options: [
            'Immediately after getting it right 10 times in a row',
            'Right before your brain is about to forget the material',
            'Exactly once every 24 hours regardless of difficulty',
            'Only once at the end of the semester'
          ],
          correctIndex: 1,
          explanation: 'Reviewing at the cusp of forgetting maximizes synaptic effort, strengthening the memory trace without wasting review time.'
        },
        {
          id: 'q-3',
          prompt: 'In the Pomodoro technique, what is the primary purpose of the timed interval?',
          options: [
            'To force you to finish an entire project in 25 minutes',
            'To prevent multi-tasking and induce deep single-task focus with scheduled cognitive rest',
            'To track exact billable client hours down to the second',
            'To minimize sleep needed at night'
          ],
          correctIndex: 1,
          explanation: 'Pomodoro establishes a boundary around single-task focus, reducing executive fatigue and resistance to starting.'
        },
        {
          id: 'q-4',
          prompt: 'What role does sleep play in memory retention?',
          options: [
            'Sleep only rests muscles; it has no effect on memory',
            'During deep sleep, the hippocampus replays and transfers memories to the neocortex for permanent consolidation',
            'Sleep causes decay of all newly formed memories',
            'Memory is only consolidated while drinking caffeine'
          ],
          correctIndex: 1,
          explanation: 'Slow-wave sleep and REM sleep are vital for memory consolidation and neural synaptic pruning.'
        }
      ]
    },
    {
      id: 'quiz-critical-thinking',
      title: 'Mental Models & Decision Quality',
      description: 'Test your grasp of core cognitive models for problem solving.',
      questions: [
        {
          id: 'q-m1',
          prompt: 'Occam\'s Razor suggests that when presented with competing hypotheses, one should select the one that:',
          options: [
            'Has the most complex explanation',
            'Makes the fewest assumptions',
            'Comes from the oldest authority',
            'Requires the highest computational power'
          ],
          correctIndex: 1,
          explanation: 'Occam\'s razor states that simpler explanations with fewer unverified assumptions are more likely to be correct.'
        },
        {
          id: 'q-m2',
          prompt: 'What is "Second-Order Thinking"?',
          options: [
            'Thinking about a problem for exactly two seconds',
            'Considering the downstream consequences and effects of the effects',
            'Only solving problems that others have already solved',
            'Delegating decisions to a second person'
          ],
          correctIndex: 1,
          explanation: 'First-order thinking asks "what is the immediate result?". Second-order thinking asks "and then what happens next?".'
        }
      ]
    }
  ];

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  class Store {
    constructor() {
      this.load();
    }

    load() {
      try {
        const savedSettings = localStorage.getItem('recaller_settings');
        this.settings = savedSettings ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) } : { ...DEFAULT_SETTINGS };

        const savedDecks = localStorage.getItem('recaller_decks');
        this.decks = savedDecks ? JSON.parse(savedDecks) : [...DEFAULT_DECKS];

        const savedCards = localStorage.getItem('recaller_cards');
        this.cards = savedCards ? JSON.parse(savedCards) : [...DEFAULT_CARDS];

        const savedQuizzes = localStorage.getItem('recaller_quizzes');
        this.quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : [...DEFAULT_QUIZZES];

        const activeDeck = localStorage.getItem('recaller_active_deck');
        this.activeDeckId = activeDeck && this.decks.some(d => d.id === activeDeck)
          ? activeDeck
          : (this.decks[0] ? this.decks[0].id : null);
      } catch (err) {
        console.error('Failed to parse local storage. Using defaults.', err);
        this.settings = { ...DEFAULT_SETTINGS };
        this.decks = [...DEFAULT_DECKS];
        this.cards = [...DEFAULT_CARDS];
        this.quizzes = [...DEFAULT_QUIZZES];
        this.activeDeckId = this.decks[0] ? this.decks[0].id : null;
      }
    }

    save() {
      localStorage.setItem('recaller_settings', JSON.stringify(this.settings));
      localStorage.setItem('recaller_decks', JSON.stringify(this.decks));
      localStorage.setItem('recaller_cards', JSON.stringify(this.cards));
      localStorage.setItem('recaller_quizzes', JSON.stringify(this.quizzes));
      if (this.activeDeckId) {
        localStorage.setItem('recaller_active_deck', this.activeDeckId);
      }
    }

    resetToDefault() {
      this.settings = { ...DEFAULT_SETTINGS };
      this.decks = JSON.parse(JSON.stringify(DEFAULT_DECKS));
      this.cards = JSON.parse(JSON.stringify(DEFAULT_CARDS));
      this.quizzes = JSON.parse(JSON.stringify(DEFAULT_QUIZZES));
      this.activeDeckId = this.decks[0].id;
      this.save();
    }
  }

  const store = new Store();

  // =========================================================================
  // AUDIO SYNTHESIZER (Gentle Web Audio Chime)
  // =========================================================================
  function playHarmonicChime() {
    if (!store.settings.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      masterGain.connect(ctx.destination);

      // Harmonious interval (E5 659.25Hz & B5 987.77Hz + sparkle)
      const freqs = [659.25, 987.77, 1318.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        osc.connect(masterGain);
        osc.start(now + idx * 0.08);
        osc.stop(now + 1.8);
      });
    } catch (e) {
      console.warn('AudioContext unavailable or blocked:', e);
    }
  }

  // =========================================================================
  // POMODORO CONTROLLER
  // =========================================================================
  const pomodoro = {
    mode: 'focus', // 'focus' | 'shortBreak' | 'longBreak'
    timeLeft: store.settings.focusMinutes * 60,
    totalTime: store.settings.focusMinutes * 60,
    timerId: null,
    isRunning: false,
    cycle: 1, // 1 through 4

    init() {
      this.domTime = document.getElementById('pomo-time');
      this.domStatus = document.getElementById('pomo-status');
      this.domBadge = document.getElementById('pomo-session-badge');
      this.domToggleBtn = document.getElementById('pomo-toggle-btn');
      this.domToggleText = document.getElementById('pomo-toggle-text');
      this.domToggleIcon = document.getElementById('pomo-toggle-icon');
      this.domResetBtn = document.getElementById('pomo-reset-btn');
      this.domSkipBtn = document.getElementById('pomo-skip-btn');
      this.domRing = document.getElementById('pomo-ring');
      this.modeButtons = document.querySelectorAll('.pomo-mode-btn');
      this.pomoDeckSelect = document.getElementById('pomo-deck-target');
      this.pomoJumpStudyBtn = document.getElementById('pomo-jump-study-btn');

      this.circumference = 2 * Math.PI * 140; // r=140
      this.domRing.style.strokeDasharray = `${this.circumference} ${this.circumference}`;

      this.bindEvents();
      this.syncDurations();
      this.updateDeckDropdown();
      this.render();
    },

    bindEvents() {
      this.domToggleBtn.addEventListener('click', () => this.toggle());
      this.domResetBtn.addEventListener('click', () => this.reset());
      this.domSkipBtn.addEventListener('click', () => this.skip());

      this.modeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const mode = e.currentTarget.dataset.mode;
          this.setMode(mode);
        });
      });

      this.pomoDeckSelect.addEventListener('change', (e) => {
        if (e.target.value) {
          store.activeDeckId = e.target.value;
          store.save();
          flashcards.onActiveDeckChanged();
        }
      });

      this.pomoJumpStudyBtn.addEventListener('click', () => {
        app.switchTab('flashcards');
      });
    },

    syncDurations() {
      if (this.mode === 'focus') {
        this.totalTime = store.settings.focusMinutes * 60;
      } else if (this.mode === 'shortBreak') {
        this.totalTime = store.settings.shortBreakMinutes * 60;
      } else {
        this.totalTime = store.settings.longBreakMinutes * 60;
      }
      if (!this.isRunning) {
        this.timeLeft = this.totalTime;
      }
    },

    updateDeckDropdown() {
      this.pomoDeckSelect.innerHTML = '<option value="">(None - Free Focus)</option>';
      store.decks.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        if (d.id === store.activeDeckId) opt.selected = true;
        this.pomoDeckSelect.appendChild(opt);
      });
    },

    setMode(newMode) {
      this.pause();
      this.mode = newMode;
      this.modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === newMode);
      });
      this.syncDurations();
      this.render();
    },

    toggle() {
      if (this.isRunning) {
        this.pause();
      } else {
        this.start();
      }
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.domToggleText.textContent = 'Pause';
      this.domToggleIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;

      this.timerId = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.render();
        } else {
          this.onTimerComplete();
        }
      }, 1000);
    },

    pause() {
      this.isRunning = false;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.domToggleText.textContent = this.mode === 'focus' ? 'Start Focus' : 'Start Break';
      this.domToggleIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
    },

    reset() {
      this.pause();
      this.timeLeft = this.totalTime;
      this.render();
    },

    skip() {
      this.pause();
      this.advanceCycle();
    },

    onTimerComplete() {
      this.pause();
      playHarmonicChime();
      this.advanceCycle();
      if (store.settings.autoStart) {
        setTimeout(() => this.start(), 800);
      }
    },

    advanceCycle() {
      if (this.mode === 'focus') {
        if (this.cycle < 4) {
          this.setMode('shortBreak');
        } else {
          this.setMode('longBreak');
        }
      } else if (this.mode === 'shortBreak') {
        this.cycle++;
        this.setMode('focus');
      } else {
        // long break finished
        this.cycle = 1;
        this.setMode('focus');
      }
    },

    render() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      this.domTime.textContent = formatted;
      document.title = `${formatted} — Recaller`;

      // Update ring offset
      const progressRatio = this.totalTime > 0 ? (this.timeLeft / this.totalTime) : 0;
      const offset = this.circumference - (progressRatio * this.circumference);
      this.domRing.style.strokeDashoffset = offset;

      // Status label
      if (this.mode === 'focus') {
        this.domStatus.textContent = 'DEEP FOCUS SESSION';
      } else if (this.mode === 'shortBreak') {
        this.domStatus.textContent = 'REST & COGNITIVE RECOVERY';
      } else {
        this.domStatus.textContent = 'EXTENDED REST SESSION';
      }

      this.domBadge.textContent = `Cycle ${this.cycle} / 4`;
    }
  };

  // =========================================================================
  // FLASHCARDS CONTROLLER
  // =========================================================================
  const flashcards = {
    currentIndex: 0,
    isFlipped: false,
    activeCards: [],

    init() {
      // DOM Elements
      this.deckSelect = document.getElementById('deck-select');
      this.createDeckBtn = document.getElementById('create-deck-btn');
      this.editDeckBtn = document.getElementById('edit-deck-btn');
      this.deleteDeckBtn = document.getElementById('delete-deck-btn');
      this.manageCardsBtn = document.getElementById('manage-cards-btn');
      this.addCardQuickBtn = document.getElementById('add-card-quick-btn');
      this.emptyAddCardBtn = document.getElementById('empty-add-card-btn');

      this.studyViewport = document.getElementById('study-viewport');
      this.emptyCardsState = document.getElementById('empty-cards-state');
      this.cardStepBadge = document.getElementById('card-step-badge');
      this.studyProgressBar = document.getElementById('study-progress-bar');
      this.studyMasteryRatio = document.getElementById('study-mastery-ratio');
      this.totalCardsCount = document.getElementById('total-cards-count');

      this.flipCard = document.getElementById('active-flip-card');
      this.cardFrontContent = document.getElementById('card-front-content');
      this.cardBackContent = document.getElementById('card-back-content');
      this.cardHintContainer = document.getElementById('card-hint-container');
      this.cardHintContent = document.getElementById('card-hint-content');
      this.cardDeckNameDisplay = document.getElementById('card-deck-name-display');
      this.cardDeckNameBackDisplay = document.getElementById('card-deck-name-back-display');

      this.prevCardBtn = document.getElementById('prev-card-btn');
      this.nextCardBtn = document.getElementById('next-card-btn');
      this.markReviewBtn = document.getElementById('mark-review-btn');
      this.markMasteredBtn = document.getElementById('mark-mastered-btn');
      this.shuffleDeckBtn = document.getElementById('shuffle-deck-btn');

      this.bindEvents();
      this.renderDecks();
      this.loadActiveCards();
    },

    bindEvents() {
      this.deckSelect.addEventListener('change', (e) => {
        store.activeDeckId = e.target.value;
        store.save();
        pomodoro.updateDeckDropdown();
        this.onActiveDeckChanged();
      });

      this.createDeckBtn.addEventListener('click', () => dialogs.openDeckDialog('create'));
      this.editDeckBtn.addEventListener('click', () => dialogs.openDeckDialog('edit'));
      this.deleteDeckBtn.addEventListener('click', () => this.handleDeleteDeck());
      
      this.addCardQuickBtn.addEventListener('click', () => dialogs.openCardDialog());
      this.emptyAddCardBtn.addEventListener('click', () => dialogs.openCardDialog());
      this.manageCardsBtn.addEventListener('click', () => dialogs.openManageCardsDialog());

      this.flipCard.addEventListener('click', () => this.toggleFlip());
      
      this.prevCardBtn.addEventListener('click', () => this.prevCard());
      this.nextCardBtn.addEventListener('click', () => this.nextCard());
      this.shuffleDeckBtn.addEventListener('click', () => this.shuffleCards());

      this.markReviewBtn.addEventListener('click', () => {
        this.assessCurrentCard(false);
      });

      this.markMasteredBtn.addEventListener('click', () => {
        this.assessCurrentCard(true);
      });
    },

    onActiveDeckChanged() {
      this.currentIndex = 0;
      this.isFlipped = false;
      this.renderDecks();
      this.loadActiveCards();
    },

    renderDecks() {
      this.deckSelect.innerHTML = '';
      if (store.decks.length === 0) {
        const emptyOpt = document.createElement('option');
        emptyOpt.textContent = 'No decks available';
        this.deckSelect.appendChild(emptyOpt);
        this.editDeckBtn.disabled = true;
        this.deleteDeckBtn.disabled = true;
        this.addCardQuickBtn.disabled = true;
        this.manageCardsBtn.disabled = true;
        return;
      }

      this.editDeckBtn.disabled = false;
      this.deleteDeckBtn.disabled = false;
      this.addCardQuickBtn.disabled = false;
      this.manageCardsBtn.disabled = false;

      store.decks.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        if (d.id === store.activeDeckId) opt.selected = true;
        this.deckSelect.appendChild(opt);
      });
    },

    loadActiveCards() {
      if (!store.activeDeckId) {
        this.activeCards = [];
      } else {
        this.activeCards = store.cards.filter(c => c.deckId === store.activeDeckId);
      }
      this.totalCardsCount.textContent = this.activeCards.length;

      if (this.activeCards.length === 0) {
        this.studyViewport.style.display = 'none';
        this.emptyCardsState.style.display = 'block';
      } else {
        this.studyViewport.style.display = 'flex';
        this.emptyCardsState.style.display = 'none';
        if (this.currentIndex >= this.activeCards.length) {
          this.currentIndex = 0;
        }
        this.renderCard();
      }
    },

    toggleFlip() {
      this.isFlipped = !this.isFlipped;
      this.flipCard.classList.toggle('is-flipped', this.isFlipped);
    },

    prevCard() {
      if (this.activeCards.length === 0) return;
      this.isFlipped = false;
      this.flipCard.classList.remove('is-flipped');
      this.currentIndex = (this.currentIndex - 1 + this.activeCards.length) % this.activeCards.length;
      this.renderCard();
    },

    nextCard() {
      if (this.activeCards.length === 0) return;
      this.isFlipped = false;
      this.flipCard.classList.remove('is-flipped');
      this.currentIndex = (this.currentIndex + 1) % this.activeCards.length;
      this.renderCard();
    },

    shuffleCards() {
      for (let i = this.activeCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.activeCards[i], this.activeCards[j]] = [this.activeCards[j], this.activeCards[i]];
      }
      this.currentIndex = 0;
      this.isFlipped = false;
      this.flipCard.classList.remove('is-flipped');
      this.renderCard();
      app.showStatus('Deck shuffled.');
    },

    assessCurrentCard(mastered) {
      if (this.activeCards.length === 0) return;
      const current = this.activeCards[this.currentIndex];
      current.mastered = mastered;
      current.reviewCount = (current.reviewCount || 0) + 1;

      // sync to store
      const cardInStore = store.cards.find(c => c.id === current.id);
      if (cardInStore) {
        cardInStore.mastered = mastered;
        cardInStore.reviewCount = current.reviewCount;
        store.save();
      }

      this.nextCard();
    },

    renderCard() {
      const card = this.activeCards[this.currentIndex];
      const activeDeck = store.decks.find(d => d.id === store.activeDeckId);
      const deckName = activeDeck ? activeDeck.name : 'Deck';

      this.cardDeckNameDisplay.textContent = deckName;
      this.cardDeckNameBackDisplay.textContent = deckName;

      this.cardFrontContent.textContent = card.front;
      this.cardBackContent.textContent = card.back;

      if (card.hint && card.hint.trim() !== '') {
        this.cardHintContainer.style.display = 'block';
        this.cardHintContent.textContent = card.hint;
      } else {
        this.cardHintContainer.style.display = 'none';
      }

      // Progress bar & badges
      this.cardStepBadge.textContent = `Card ${this.currentIndex + 1} of ${this.activeCards.length}`;
      const pct = Math.round(((this.currentIndex + 1) / this.activeCards.length) * 100);
      this.studyProgressBar.style.width = `${pct}%`;

      const masteredCount = this.activeCards.filter(c => c.mastered).length;
      this.studyMasteryRatio.textContent = `${masteredCount} / ${this.activeCards.length} Mastered`;
    },

    handleDeleteDeck() {
      const activeDeck = store.decks.find(d => d.id === store.activeDeckId);
      if (!activeDeck) return;
      if (!confirm(`Are you sure you want to delete the deck "${activeDeck.name}" and all its flashcards?`)) {
        return;
      }

      // Remove cards
      store.cards = store.cards.filter(c => c.deckId !== activeDeck.id);
      // Remove deck
      store.decks = store.decks.filter(d => d.id !== activeDeck.id);
      store.activeDeckId = store.decks.length > 0 ? store.decks[0].id : null;
      store.save();

      pomodoro.updateDeckDropdown();
      this.renderDecks();
      this.loadActiveCards();
      app.showStatus('Deck deleted.');
    }
  };

  // =========================================================================
  // QUIZZES CONTROLLER
  // =========================================================================
  const quizzes = {
    activeQuiz: null,
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: [], // { question, selectedOption, isCorrect }

    init() {
      this.hubView = document.getElementById('quiz-hub-view');
      this.runnerView = document.getElementById('quiz-runner-view');
      this.resultsView = document.getElementById('quiz-results-view');

      this.quizGrid = document.getElementById('quiz-cards-list');
      this.createQuizBtn = document.getElementById('create-quiz-btn');

      // Runner elements
      this.runnerQuizTitle = document.getElementById('runner-quiz-title');
      this.runnerCounter = document.getElementById('runner-question-counter');
      this.runnerScore = document.getElementById('runner-live-score');
      this.quizProgressBar = document.getElementById('quiz-progress-bar');
      this.runnerQuestionText = document.getElementById('runner-question-text');
      this.runnerOptionsContainer = document.getElementById('runner-options-container');
      this.runnerFeedbackBox = document.getElementById('runner-feedback-box');
      this.feedbackResultBadge = document.getElementById('feedback-result-badge');
      this.feedbackExplanation = document.getElementById('feedback-explanation');
      this.runnerNextBtn = document.getElementById('runner-next-btn');
      this.quizExitBtn = document.getElementById('quiz-exit-btn');

      // Results elements
      this.summaryPercentage = document.getElementById('summary-percentage');
      this.summaryFraction = document.getElementById('summary-score-fraction');
      this.summaryMessage = document.getElementById('summary-feedback-msg');
      this.summaryBreakdown = document.getElementById('summary-breakdown-list');
      this.summaryBackHubBtn = document.getElementById('summary-back-hub-btn');
      this.summaryRetakeBtn = document.getElementById('summary-retake-btn');

      this.bindEvents();
      this.renderHub();
    },

    bindEvents() {
      this.createQuizBtn.addEventListener('click', () => dialogs.openQuizBuilderDialog());
      this.quizExitBtn.addEventListener('click', () => this.showSubView('hub'));
      this.runnerNextBtn.addEventListener('click', () => this.nextQuestion());

      this.summaryBackHubBtn.addEventListener('click', () => this.showSubView('hub'));
      this.summaryRetakeBtn.addEventListener('click', () => {
        if (this.activeQuiz) this.startQuiz(this.activeQuiz.id);
      });
    },

    showSubView(viewName) {
      this.hubView.style.display = viewName === 'hub' ? 'block' : 'none';
      this.runnerView.style.display = viewName === 'runner' ? 'block' : 'none';
      this.resultsView.style.display = viewName === 'results' ? 'block' : 'none';
      if (viewName === 'hub') {
        this.renderHub();
      }
    },

    renderHub() {
      this.quizGrid.innerHTML = '';
      if (store.quizzes.length === 0) {
        this.quizGrid.innerHTML = `
          <div class="empty-state-card" style="grid-column: 1 / -1;">
            <div class="empty-glyph">&bull;&bull;&bull;</div>
            <h3 class="empty-title">No Quizzes Created</h3>
            <p class="empty-subtitle">Build custom multiple-choice quizzes to verify retention.</p>
            <button class="btn btn-primary" onclick="document.getElementById('create-quiz-btn').click()">+ Create Quiz</button>
          </div>
        `;
        return;
      }

      store.quizzes.forEach(quiz => {
        const card = document.createElement('div');
        card.className = 'quiz-hub-card';
        card.innerHTML = `
          <div class="quiz-hub-top">
            <span class="quiz-card-badge">ASSESSMENT</span>
            <h3 class="quiz-card-title">${escapeHtml(quiz.title)}</h3>
            <p class="quiz-card-desc">${escapeHtml(quiz.description || 'Test active recall.')}</p>
          </div>
          <div class="quiz-hub-bottom">
            <span class="quiz-count-tag">${quiz.questions.length} Question${quiz.questions.length === 1 ? '' : 's'}</span>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-outline btn-sm btn-edit-quiz" data-id="${quiz.id}" title="Edit Quiz">Edit</button>
              <button class="btn btn-outline btn-sm btn-danger-hover btn-del-quiz" data-id="${quiz.id}" title="Delete Quiz">&times;</button>
              <button class="btn btn-primary btn-sm btn-start-quiz" data-id="${quiz.id}">Start &rarr;</button>
            </div>
          </div>
        `;

        card.querySelector('.btn-start-quiz').addEventListener('click', () => {
          this.startQuiz(quiz.id);
        });

        card.querySelector('.btn-edit-quiz').addEventListener('click', () => {
          dialogs.openQuizBuilderDialog(quiz.id);
        });

        card.querySelector('.btn-del-quiz').addEventListener('click', () => {
          this.deleteQuiz(quiz.id);
        });

        this.quizGrid.appendChild(card);
      });
    },

    deleteQuiz(id) {
      const q = store.quizzes.find(item => item.id === id);
      if (!q) return;
      if (!confirm(`Are you sure you want to delete the quiz "${q.title}"?`)) return;

      store.quizzes = store.quizzes.filter(item => item.id !== id);
      store.save();
      this.renderHub();
      app.showStatus('Quiz removed.');
    },

    startQuiz(quizId) {
      const quiz = store.quizzes.find(q => q.id === quizId);
      if (!quiz || quiz.questions.length === 0) {
        alert('This quiz has no questions. Please edit and add at least one question.');
        return;
      }

      this.activeQuiz = quiz;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.userAnswers = [];

      this.runnerQuizTitle.textContent = quiz.title;
      this.showSubView('runner');
      this.renderQuestion();
    },

    renderQuestion() {
      const q = this.activeQuiz.questions[this.currentQuestionIndex];
      this.runnerCounter.textContent = `Question ${this.currentQuestionIndex + 1} / ${this.activeQuiz.questions.length}`;
      this.runnerScore.textContent = `${this.score}`;
      
      const progressPct = ((this.currentQuestionIndex) / this.activeQuiz.questions.length) * 100;
      this.quizProgressBar.style.width = `${progressPct}%`;

      this.runnerQuestionText.textContent = q.prompt;
      this.runnerFeedbackBox.style.display = 'none';

      this.runnerOptionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="option-key-badge">${letters[idx] || (idx + 1)}</span>
          <span class="option-label">${escapeHtml(opt)}</span>
        `;
        btn.addEventListener('click', () => this.handleOptionSelect(idx));
        this.runnerOptionsContainer.appendChild(btn);
      });
    },

    handleOptionSelect(selectedIndex) {
      const q = this.activeQuiz.questions[this.currentQuestionIndex];
      const optionButtons = this.runnerOptionsContainer.querySelectorAll('.quiz-option-btn');
      
      // Disable further clicks
      optionButtons.forEach(b => b.disabled = true);

      const isCorrect = (selectedIndex === q.correctIndex);
      if (isCorrect) {
        this.score++;
        playHarmonicChime();
      }

      this.userAnswers.push({
        prompt: q.prompt,
        chosenText: q.options[selectedIndex],
        correctText: q.options[q.correctIndex],
        isCorrect: isCorrect,
        explanation: q.explanation
      });

      // Highlight options
      optionButtons.forEach((btn, idx) => {
        if (idx === selectedIndex) {
          btn.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');
        }
        if (!isCorrect && idx === q.correctIndex) {
          btn.classList.add('correct-reveal');
        }
      });

      // Show feedback box
      this.feedbackResultBadge.textContent = isCorrect ? 'CORRECT RECALL' : 'INCORRECT';
      this.feedbackResultBadge.className = `feedback-badge ${isCorrect ? 'correct' : 'incorrect'}`;
      this.feedbackExplanation.textContent = q.explanation || (isCorrect ? 'Well done!' : `Correct answer: ${q.options[q.correctIndex]}`);
      this.runnerFeedbackBox.style.display = 'block';

      this.runnerScore.textContent = `${this.score}`;
    },

    nextQuestion() {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.activeQuiz.questions.length) {
        this.renderQuestion();
      } else {
        this.showResults();
      }
    },

    showResults() {
      const total = this.activeQuiz.questions.length;
      const pct = Math.round((this.score / total) * 100);

      this.summaryPercentage.textContent = `${pct}%`;
      this.summaryFraction.textContent = `You answered ${this.score} of ${total} correctly.`;

      if (pct === 100) {
        this.summaryMessage.textContent = 'Flawless recall. Mastery achieved.';
      } else if (pct >= 75) {
        this.summaryMessage.textContent = 'Strong grasp. A quick review will cement the rest.';
      } else if (pct >= 50) {
        this.summaryMessage.textContent = 'Solid baseline. Turn challenging questions into flashcards!';
      } else {
        this.summaryMessage.textContent = 'Keep practicing. Regular retrieval creates lasting memory.';
      }

      // Breakdown list
      this.summaryBreakdown.innerHTML = '';
      this.userAnswers.forEach((ans, idx) => {
        const item = document.createElement('div');
        item.className = 'breakdown-item';
        item.innerHTML = `
          <div>
            <div class="breakdown-q">${idx + 1}. ${escapeHtml(ans.prompt)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 3px;">
              Your answer: ${escapeHtml(ans.chosenText)} ${!ans.isCorrect ? `&bull; Correct: ${escapeHtml(ans.correctText)}` : ''}
            </div>
          </div>
          <span class="breakdown-status" style="color: ${ans.isCorrect ? '#10b981' : '#ef4444'}">
            ${ans.isCorrect ? 'CORRECT' : 'MISSED'}
          </span>
        `;
        this.summaryBreakdown.appendChild(item);
      });

      this.showSubView('results');
    }
  };

  // =========================================================================
  // DIALOGS & MODAL CONTROLLERS
  // =========================================================================
  const dialogs = {
    init() {
      // Close triggers with data-close
      document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetId = e.currentTarget.dataset.close;
          const dialog = document.getElementById(targetId);
          if (dialog) dialog.close();
        });
      });

      // Settings modal
      this.settingsDialog = document.getElementById('settings-dialog');
      this.openSettingsBtn = document.getElementById('open-settings-btn');
      this.saveSettingsBtn = document.getElementById('save-settings-btn');
      this.resetSampleDataBtn = document.getElementById('reset-sample-data-btn');

      this.openSettingsBtn.addEventListener('click', () => this.openSettingsDialog());
      this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
      this.resetSampleDataBtn.addEventListener('click', () => {
        if (confirm('Reset all decks, cards, and quizzes to default sample data? Your custom additions will be replaced.')) {
          store.resetToDefault();
          pomodoro.syncDurations();
          pomodoro.updateDeckDropdown();
          flashcards.renderDecks();
          flashcards.loadActiveCards();
          quizzes.renderHub();
          this.settingsDialog.close();
          app.showStatus('Sample data reloaded.');
        }
      });

      // Deck dialog
      this.deckDialog = document.getElementById('deck-dialog');
      this.deckForm = document.getElementById('deck-form');
      this.deckDialogTitle = document.getElementById('deck-dialog-title');
      this.deckNameInput = document.getElementById('deck-name-input');
      this.deckDescInput = document.getElementById('deck-desc-input');
      this.editingDeckId = null;

      this.deckForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveDeck();
      });

      // Card dialog
      this.cardDialog = document.getElementById('card-dialog');
      this.cardForm = document.getElementById('card-form');
      this.cardDialogTitle = document.getElementById('card-dialog-title');
      this.cardFrontInput = document.getElementById('card-front-input');
      this.cardBackInput = document.getElementById('card-back-input');
      this.cardHintInput = document.getElementById('card-hint-input');
      this.editingCardId = null;

      this.cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveCard();
      });

      // Manage cards dialog
      this.manageCardsDialog = document.getElementById('manage-cards-dialog');
      this.manageDeckName = document.getElementById('manage-deck-name');
      this.searchCardsInput = document.getElementById('search-cards-input');
      this.manageCardsTbody = document.getElementById('manage-cards-tbody');
      this.manageAddNewCard = document.getElementById('manage-add-new-card');

      this.searchCardsInput.addEventListener('input', () => this.renderManageCardsTable());
      this.manageAddNewCard.addEventListener('click', () => {
        this.openCardDialog();
      });

      // Quiz builder dialog
      this.quizBuilderDialog = document.getElementById('quiz-builder-dialog');
      this.quizBuilderTitle = document.getElementById('quiz-builder-title');
      this.builderQuizTitle = document.getElementById('builder-quiz-title');
      this.builderQuizDesc = document.getElementById('builder-quiz-desc');
      this.builderQuestionsCount = document.getElementById('builder-questions-count');
      this.builderAddQBtn = document.getElementById('builder-add-q-btn');
      this.builderQuestionsContainer = document.getElementById('builder-questions-container');
      this.builderSaveQuizBtn = document.getElementById('builder-save-quiz-btn');
      this.editingQuizId = null;
      this.builderQuestions = [];

      this.builderAddQBtn.addEventListener('click', () => this.addBuilderQuestion());
      this.builderSaveQuizBtn.addEventListener('click', () => this.saveQuizBuilder());
    },

    // 1. Settings
    openSettingsDialog() {
      document.getElementById('cfg-focus').value = store.settings.focusMinutes;
      document.getElementById('cfg-short').value = store.settings.shortBreakMinutes;
      document.getElementById('cfg-long').value = store.settings.longBreakMinutes;
      document.getElementById('cfg-sound').checked = store.settings.soundEnabled;
      document.getElementById('cfg-autostart').checked = store.settings.autoStart;
      document.getElementById('cfg-high-contrast').checked = store.settings.highContrast;
      this.settingsDialog.showModal();
    },

    saveSettings() {
      const focus = parseInt(document.getElementById('cfg-focus').value, 10) || 25;
      const shortB = parseInt(document.getElementById('cfg-short').value, 10) || 5;
      const longB = parseInt(document.getElementById('cfg-long').value, 10) || 15;
      
      store.settings.focusMinutes = Math.max(1, focus);
      store.settings.shortBreakMinutes = Math.max(1, shortB);
      store.settings.longBreakMinutes = Math.max(1, longB);
      store.settings.soundEnabled = document.getElementById('cfg-sound').checked;
      store.settings.autoStart = document.getElementById('cfg-autostart').checked;
      store.settings.highContrast = document.getElementById('cfg-high-contrast').checked;

      store.save();
      app.applyTheme();
      pomodoro.syncDurations();
      pomodoro.render();
      this.settingsDialog.close();
      app.showStatus('Preferences saved.');
    },

    // 2. Deck dialog
    openDeckDialog(mode = 'create') {
      if (mode === 'edit') {
        const activeDeck = store.decks.find(d => d.id === store.activeDeckId);
        if (!activeDeck) return;
        this.editingDeckId = activeDeck.id;
        this.deckDialogTitle.textContent = 'Edit Deck';
        this.deckNameInput.value = activeDeck.name;
        this.deckDescInput.value = activeDeck.description || '';
      } else {
        this.editingDeckId = null;
        this.deckDialogTitle.textContent = 'Create Deck';
        this.deckNameInput.value = '';
        this.deckDescInput.value = '';
      }
      this.deckDialog.showModal();
      this.deckNameInput.focus();
    },

    saveDeck() {
      const name = this.deckNameInput.value.trim();
      const desc = this.deckDescInput.value.trim();
      if (!name) return;

      if (this.editingDeckId) {
        const deck = store.decks.find(d => d.id === this.editingDeckId);
        if (deck) {
          deck.name = name;
          deck.description = desc;
        }
      } else {
        const newDeck = {
          id: 'deck-' + Date.now(),
          name: name,
          description: desc,
          createdAt: Date.now()
        };
        store.decks.push(newDeck);
        store.activeDeckId = newDeck.id;
      }

      store.save();
      pomodoro.updateDeckDropdown();
      flashcards.renderDecks();
      flashcards.loadActiveCards();
      this.deckDialog.close();
      app.showStatus('Deck saved.');
    },

    // 3. Card dialog
    openCardDialog(cardId = null) {
      if (!store.activeDeckId) {
        alert('Please create or select a deck first.');
        return;
      }

      this.editingCardId = cardId;
      if (cardId) {
        const card = store.cards.find(c => c.id === cardId);
        if (!card) return;
        this.cardDialogTitle.textContent = 'Edit Flashcard';
        this.cardFrontInput.value = card.front;
        this.cardBackInput.value = card.back;
        this.cardHintInput.value = card.hint || '';
      } else {
        this.cardDialogTitle.textContent = 'Add Flashcard';
        this.cardFrontInput.value = '';
        this.cardBackInput.value = '';
        this.cardHintInput.value = '';
      }

      this.cardDialog.showModal();
      this.cardFrontInput.focus();
    },

    saveCard() {
      const front = this.cardFrontInput.value.trim();
      const back = this.cardBackInput.value.trim();
      const hint = this.cardHintInput.value.trim();
      if (!front || !back) return;

      if (this.editingCardId) {
        const card = store.cards.find(c => c.id === this.editingCardId);
        if (card) {
          card.front = front;
          card.back = back;
          card.hint = hint;
        }
      } else {
        const newCard = {
          id: 'card-' + Date.now(),
          deckId: store.activeDeckId,
          front: front,
          back: back,
          hint: hint,
          mastered: false,
          reviewCount: 0,
          createdAt: Date.now()
        };
        store.cards.push(newCard);
      }

      store.save();
      flashcards.loadActiveCards();
      this.renderManageCardsTable();
      this.cardDialog.close();
      app.showStatus('Card saved.');
    },

    // 4. Manage cards dialog
    openManageCardsDialog() {
      const deck = store.decks.find(d => d.id === store.activeDeckId);
      this.manageDeckName.textContent = deck ? deck.name : '';
      this.searchCardsInput.value = '';
      this.renderManageCardsTable();
      this.manageCardsDialog.showModal();
    },

    renderManageCardsTable() {
      const query = (this.searchCardsInput.value || '').toLowerCase().trim();
      const deckCards = store.cards.filter(c => c.deckId === store.activeDeckId);
      const filtered = deckCards.filter(c => {
        return c.front.toLowerCase().includes(query) || c.back.toLowerCase().includes(query);
      });

      this.manageCardsTbody.innerHTML = '';
      if (filtered.length === 0) {
        this.manageCardsTbody.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">
              No cards found in this deck.
            </td>
          </tr>
        `;
        return;
      }

      filtered.forEach((card, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="color: var(--text-muted); font-family: var(--font-mono);">${idx + 1}</td>
          <td style="max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(card.front)}</td>
          <td style="max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(card.back)}</td>
          <td>
            <span class="dot-indicator ${card.mastered ? 'dot-mastered' : 'dot-review'}" style="margin-right: 4px;"></span>
            <span style="font-size: 0.75rem; font-family: var(--font-mono);">${card.mastered ? 'Mastered' : 'Review'}</span>
          </td>
          <td style="text-align: right;">
            <button class="table-action-btn btn-edit" data-id="${card.id}">Edit</button>
            <button class="table-action-btn btn-danger" data-id="${card.id}">Delete</button>
          </td>
        `;

        tr.querySelector('.btn-edit').addEventListener('click', () => {
          this.openCardDialog(card.id);
        });

        tr.querySelector('.btn-danger').addEventListener('click', () => {
          if (confirm('Delete this flashcard?')) {
            store.cards = store.cards.filter(c => c.id !== card.id);
            store.save();
            flashcards.loadActiveCards();
            this.renderManageCardsTable();
          }
        });

        this.manageCardsTbody.appendChild(tr);
      });
    },

    // 5. Quiz builder
    openQuizBuilderDialog(quizId = null) {
      this.editingQuizId = quizId;
      if (quizId) {
        const quiz = store.quizzes.find(q => q.id === quizId);
        if (!quiz) return;
        this.quizBuilderTitle.textContent = 'Edit Quiz';
        this.builderQuizTitle.value = quiz.title;
        this.builderQuizDesc.value = quiz.description || '';
        this.builderQuestions = JSON.parse(JSON.stringify(quiz.questions));
      } else {
        this.quizBuilderTitle.textContent = 'Create New Quiz';
        this.builderQuizTitle.value = '';
        this.builderQuizDesc.value = '';
        this.builderQuestions = [
          {
            id: 'q-' + Date.now(),
            prompt: '',
            options: ['', '', '', ''],
            correctIndex: 0,
            explanation: ''
          }
        ];
      }

      this.renderBuilderQuestions();
      this.quizBuilderDialog.showModal();
    },

    renderBuilderQuestions() {
      this.builderQuestionsCount.textContent = this.builderQuestions.length;
      this.builderQuestionsContainer.innerHTML = '';

      this.builderQuestions.forEach((q, qIndex) => {
        const card = document.createElement('div');
        card.className = 'builder-q-card';
        card.innerHTML = `
          <div class="builder-q-top">
            <span class="builder-q-num">QUESTION #${qIndex + 1}</span>
            ${this.builderQuestions.length > 1 ? `<button type="button" class="btn btn-outline btn-sm btn-danger-hover btn-del-q" data-qindex="${qIndex}">Delete</button>` : ''}
          </div>
          <div class="field-item">
            <label>Question Prompt</label>
            <input type="text" class="clean-input input-q-prompt" value="${escapeHtml(q.prompt)}" placeholder="e.g. What is the testing effect?" required>
          </div>
          <div>
            <label class="field-label" style="display: block; margin-bottom: 0.4rem;">Options (Select radio for correct answer)</label>
            <div class="builder-options-grid">
              ${[0, 1, 2, 3].map(optIdx => `
                <div class="builder-option-row">
                  <input type="radio" name="correct-${qIndex}" class="builder-radio" value="${optIdx}" ${q.correctIndex === optIdx ? 'checked' : ''}>
                  <input type="text" class="clean-input input-q-opt" data-opt="${optIdx}" value="${escapeHtml(q.options[optIdx] || '')}" placeholder="Option ${String.fromCharCode(65 + optIdx)}" required>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="field-item" style="margin-top: 0.5rem; margin-bottom: 0;">
            <label>Explanation / Feedback (Optional)</label>
            <input type="text" class="clean-input input-q-exp" value="${escapeHtml(q.explanation || '')}" placeholder="Why is this answer correct?">
          </div>
        `;

        // Bind live updates
        card.querySelector('.input-q-prompt').addEventListener('input', (e) => {
          q.prompt = e.target.value;
        });

        card.querySelectorAll('.input-q-opt').forEach(optInp => {
          optInp.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.opt, 10);
            q.options[idx] = e.target.value;
          });
        });

        card.querySelectorAll(`input[name="correct-${qIndex}"]`).forEach(radio => {
          radio.addEventListener('change', (e) => {
            q.correctIndex = parseInt(e.target.value, 10);
          });
        });

        card.querySelector('.input-q-exp').addEventListener('input', (e) => {
          q.explanation = e.target.value;
        });

        const delBtn = card.querySelector('.btn-del-q');
        if (delBtn) {
          delBtn.addEventListener('click', () => {
            this.builderQuestions.splice(qIndex, 1);
            this.renderBuilderQuestions();
          });
        }

        this.builderQuestionsContainer.appendChild(card);
      });
    },

    addBuilderQuestion() {
      this.builderQuestions.push({
        id: 'q-' + Date.now(),
        prompt: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: ''
      });
      this.renderBuilderQuestions();
    },

    saveQuizBuilder() {
      const title = this.builderQuizTitle.value.trim();
      const desc = this.builderQuizDesc.value.trim();

      if (!title) {
        alert('Please give your quiz a title.');
        this.builderQuizTitle.focus();
        return;
      }

      if (this.builderQuestions.length === 0) {
        alert('Please add at least one question.');
        return;
      }

      // Validate questions
      for (let i = 0; i < this.builderQuestions.length; i++) {
        const q = this.builderQuestions[i];
        if (!q.prompt || !q.prompt.trim()) {
          alert(`Question #${i + 1} has an empty prompt.`);
          return;
        }
        for (let j = 0; j < 4; j++) {
          if (!q.options[j] || !q.options[j].trim()) {
            alert(`Question #${i + 1}, Option ${String.fromCharCode(65 + j)} cannot be empty.`);
            return;
          }
        }
      }

      if (this.editingQuizId) {
        const quiz = store.quizzes.find(q => q.id === this.editingQuizId);
        if (quiz) {
          quiz.title = title;
          quiz.description = desc;
          quiz.questions = this.builderQuestions;
        }
      } else {
        const newQuiz = {
          id: 'quiz-' + Date.now(),
          title: title,
          description: desc,
          questions: this.builderQuestions
        };
        store.quizzes.push(newQuiz);
      }

      store.save();
      quizzes.renderHub();
      this.quizBuilderDialog.close();
      app.showStatus('Quiz saved.');
    }
  };

  // =========================================================================
  // MAIN APP COORDINATOR
  // =========================================================================
  const app = {
    activeTab: 'pomodoro',

    init() {
      this.applyTheme();
      this.bindNavigation();
      this.bindDataBackup();
      this.bindKeyboardShortcuts();

      pomodoro.init();
      flashcards.init();
      quizzes.init();
      dialogs.init();

      this.showStatus('Recaller ready.');
    },

    applyTheme() {
      document.documentElement.setAttribute('data-theme', store.settings.theme);
      if (store.settings.highContrast) {
        document.documentElement.style.setProperty('--border-light', store.settings.theme === 'dark' ? '#52525b' : '#a1a1aa');
        document.documentElement.style.setProperty('--border-strong', store.settings.theme === 'dark' ? '#71717a' : '#71717a');
      } else {
        document.documentElement.style.removeProperty('--border-light');
        document.documentElement.style.removeProperty('--border-strong');
      }
    },

    toggleTheme() {
      store.settings.theme = store.settings.theme === 'dark' ? 'light' : 'dark';
      store.save();
      this.applyTheme();
    },

    bindNavigation() {
      const themeToggle = document.getElementById('theme-toggle');
      themeToggle.addEventListener('click', () => this.toggleTheme());

      const navButtons = document.querySelectorAll('.nav-btn');
      navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tab = e.currentTarget.dataset.tab;
          this.switchTab(tab);
        });
      });
    },

    switchTab(tabName) {
      this.activeTab = tabName;
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
      });

      document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `view-${tabName}`);
      });

      if (tabName === 'flashcards') {
        flashcards.loadActiveCards();
      } else if (tabName === 'quizzes') {
        quizzes.renderHub();
      }
    },

    bindKeyboardShortcuts() {
      window.addEventListener('keydown', (e) => {
        // Ignore if user is inside an input, textarea, or select
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

        // Any open dialog? Let Esc work natively or close
        if (e.key === 'Escape') {
          document.querySelectorAll('dialog[open]').forEach(d => d.close());
          return;
        }

        // Active tab specifics
        if (this.activeTab === 'pomodoro') {
          if (e.code === 'Space') {
            e.preventDefault();
            pomodoro.toggle();
          } else if (e.key.toLowerCase() === 'r') {
            e.preventDefault();
            pomodoro.reset();
          }
        } else if (this.activeTab === 'flashcards') {
          if (e.code === 'Space') {
            e.preventDefault();
            flashcards.toggleFlip();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            flashcards.prevCard();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            flashcards.nextCard();
          }
        } else if (this.activeTab === 'quizzes') {
          if (quizzes.runnerView.style.display !== 'none' && quizzes.runnerFeedbackBox.style.display === 'none') {
            if (['1', '2', '3', '4'].includes(e.key)) {
              e.preventDefault();
              const optIdx = parseInt(e.key, 10) - 1;
              quizzes.handleOptionSelect(optIdx);
            }
          } else if (quizzes.runnerFeedbackBox.style.display !== 'none' && e.code === 'Space') {
            e.preventDefault();
            quizzes.nextQuestion();
          }
        }
      });
    },

    bindDataBackup() {
      const backupBtn = document.getElementById('backup-data-btn');
      const restoreInput = document.getElementById('restore-file-input');

      // Export JSON
      backupBtn.addEventListener('click', () => {
        const payload = {
          version: '1.0',
          appName: 'Recaller',
          exportDate: new Date().toISOString(),
          settings: store.settings,
          decks: store.decks,
          cards: store.cards,
          quizzes: store.quizzes
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recaller-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showStatus('Data exported successfully.');
      });

      // Import JSON
      restoreInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.decks && data.cards && data.quizzes) {
              if (confirm('Import data from backup? This will merge and restore decks, cards, and quizzes.')) {
                store.settings = { ...DEFAULT_SETTINGS, ...(data.settings || {}) };
                store.decks = data.decks;
                store.cards = data.cards;
                store.quizzes = data.quizzes;
                store.activeDeckId = store.decks[0] ? store.decks[0].id : null;
                store.save();

                this.applyTheme();
                pomodoro.syncDurations();
                pomodoro.updateDeckDropdown();
                flashcards.renderDecks();
                flashcards.loadActiveCards();
                quizzes.renderHub();
                this.showStatus('Data imported successfully.');
              }
            } else {
              alert('Invalid backup file structure.');
            }
          } catch (err) {
            alert('Failed to parse JSON file.');
          }
        };
        reader.readAsText(file);
        restoreInput.value = '';
      });
    },

    showStatus(msg) {
      const footerStatus = document.getElementById('footer-status');
      if (footerStatus) {
        footerStatus.textContent = msg;
        setTimeout(() => {
          footerStatus.textContent = 'Recaller Ready';
        }, 3500);
      }
    }
  };

  // Helper utility
  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Bootstrap when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
  } else {
    app.init();
  }

})();
