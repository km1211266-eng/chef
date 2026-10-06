import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MenuItemCard from './components/MenuItemCard';
import AddItemModal from './components/AddItemModal';
import { COLORS, SPACING } from './theme';

export default function App() {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const handleSave = (item) => {
    setItems((prev) => [item, ...prev]); // list updates automatically
    setModalVisible(false);
    setConfirmation(`"${item.name}" was added to the menu.`);
    setTimeout(() => setConfirmation(''), 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Chef's Menu Manager</Text>
        <Text style={styles.subtitle}>
          {items.length} {items.length === 1 ? 'item' : 'items'} on the menu
        </Text>
      </View>

      {confirmation !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{confirmation}</Text>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        contentContainerStyle={items.length === 0 ? styles.emptyWrap : styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No menu items yet</Text>
            <Text style={styles.emptyText}>Tap "Add Menu Item" to create your first dish.</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>+ Add Menu Item</Text>
      </TouchableOpacity>

      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? 60 : 44,
    paddingBottom: SPACING.md + 4,
    paddingHorizontal: SPACING.md,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: COLORS.primarySoft, fontSize: 14, marginTop: SPACING.xs },
  toast: {
    backgroundColor: COLORS.success,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 10,
  },
  toastText: { color: '#fff', fontWeight: '600' },
  list: { padding: SPACING.md, paddingBottom: 110 },
  emptyWrap: { flexGrow: 1, justifyContent: 'center', padding: SPACING.lg },
  empty: { alignItems: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: COLORS.primaryDark },
  emptyText: { fontSize: 15, color: COLORS.muted, marginTop: SPACING.sm, textAlign: 'center' },
  addBtn: {
    position: 'absolute',
    left: SPACING.md,
    right: SPACING.md,
    bottom: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
  },
  addText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
