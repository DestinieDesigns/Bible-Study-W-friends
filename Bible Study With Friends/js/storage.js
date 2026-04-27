(function () {
  const data = window.ScripturePathData;

  function createEmptyProgress() {
    const progress = {};

    Object.keys(data.books).forEach(function (book) {
      progress[book] = [];
    });

    return progress;
  }

  function normalizeProgress(rawProgress) {
    const progress = createEmptyProgress();

    if (!rawProgress || typeof rawProgress !== "object") {
      return progress;
    }

    Object.keys(progress).forEach(function (book) {
      if (Array.isArray(rawProgress[book])) {
        progress[book] = rawProgress[book].filter(function (value) {
          return Number.isInteger(value);
        });
      }
    });

    return progress;
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(data.storageKey);
      return normalizeProgress(raw ? JSON.parse(raw) : null);
    } catch (error) {
      return createEmptyProgress();
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(data.storageKey, JSON.stringify(normalizeProgress(progress)));
  }

  window.ScripturePathStorage = {
    createEmptyProgress: createEmptyProgress,
    loadProgress: loadProgress,
    saveProgress: saveProgress
  };
}());
