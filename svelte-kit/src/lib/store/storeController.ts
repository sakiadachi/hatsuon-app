import authStore from "./authStore";
import currentCollectionStore from "./currentCollectionStore";
import currentPhraseStore from "./currentPhraseStore";

const { resetStore: resetAuthStore } = authStore;
const { resetStore: resetCollectionStore } = currentCollectionStore;
const { resetStore: resetPhraseStore } = currentPhraseStore;

/**
 * Reset states in all stores
 * Call this function when user logs out
 */
const resetStores = () => {
  resetAuthStore();
  resetCollectionStore();
  resetPhraseStore();
};

export default {
  resetStores,
};
