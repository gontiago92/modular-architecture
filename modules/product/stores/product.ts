export const useProductStore = defineStore("ProductStore", () => {
    // State
    const state = ref({});

    // Getters
    const getter = computed(() => "This is a getter function !");

    // Actions
    const action = () => {
        console.log("Performing an action !");
    };

    return {
        state,
        getter,
        action,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}