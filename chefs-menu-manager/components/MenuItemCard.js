import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';

export default function MenuItemCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.course}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '700', color: COLORS.text, flex: 1, marginRight: SPACING.sm },
  price: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primarySoft,
    borderRadius: 20,
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: SPACING.xs,
    marginVertical: SPACING.sm,
  },
  badgeText: { color: COLORS.primaryDark, fontSize: 13, fontWeight: '600' },
  description: { fontSize: 15, color: COLORS.muted, lineHeight: 22 },
});
