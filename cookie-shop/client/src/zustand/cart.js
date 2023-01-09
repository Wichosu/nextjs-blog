import create from 'zustand';

const useStore = create(set => ({
  items: [],
  addItem: (item) => set(state => ({items: [...state.items, item]})),
  updateItems: () => set(state => ({items: [...state.items]})),
  removeItem: (item) => set(state => ({items: state.items.filter((oldItem) => oldItem.id !== item.id)}))
}))

export default useStore;