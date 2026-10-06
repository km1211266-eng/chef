# Chef's Menu Manager (Part 2 PoE)

## Run
1. Install Node.js, then in this folder: `npm install`
2. `npx expo install --fix` (aligns package versions with your Expo Go app)
3. `npx expo start`, then scan the QR code with Expo Go (or press `a` / `i` / `w`).

## Features (Part 2 scope)
- Clear app title and item counter
- Add Menu Item screen: Dish Name (TextInput), Description (multiline TextInput), Course (selectable chips), Price (decimal keypad)
- Validation with inline error messages
- FlatList displays all items; updates automatically when a new item is added
- Empty state and success confirmation

Editing, deleting, searching, filtering and statistics are left for the Final PoE.

## Structure
- App.js: home screen, state (useState)
- components/AddItemModal.js: form and validation
- components/MenuItemCard.js: one menu item
- theme.js: colours, spacing, course list
