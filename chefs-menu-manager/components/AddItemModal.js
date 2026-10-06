import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS, SPACING, COURSES } from '../theme';

const EMPTY = { name: '', description: '', course: '', price: '' };

export default function AddItemModal({ visible, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Enter the dish name.';
    if (!form.description.trim()) e.description = 'Enter a short description.';
    if (!form.course) e.course = 'Choose a course.';
    const price = parseFloat(form.price.replace(',', '.'));
    if (!form.price.trim()) e.price = 'Enter a price.';
    else if (isNaN(price) || price <= 0) e.price = 'Enter a valid price greater than 0.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      id: Date.now().toString(),
      name: form.name.trim(),
      description: form.description.trim(),
      course: form.course,
      price: parseFloat(form.price.replace(',', '.')),
    });
    setForm(EMPTY);
    setErrors({});
  };

  const handleClose = () => {
    setForm(EMPTY);
    setErrors({});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Menu Item</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="e.g. Butternut Soup"
            placeholderTextColor={COLORS.muted}
            value={form.name}
            onChangeText={(t) => update('name', t)}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multiline, errors.description && styles.inputError]}
            placeholder="Describe the dish"
            placeholderTextColor={COLORS.muted}
            value={form.description}
            onChangeText={(t) => update('description', t)}
            multiline
          />
          {errors.description && <Text style={styles.error}>{errors.description}</Text>}

          <Text style={styles.label}>Course</Text>
          <View style={styles.chips}>
            {COURSES.map((c) => {
              const active = form.course === c;
              return (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => update('course', c)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {errors.course && <Text style={styles.error}>{errors.course}</Text>}

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            placeholder="e.g. 85.00"
            placeholderTextColor={COLORS.muted}
            keyboardType="decimal-pad"
            value={form.price}
            onChangeText={(t) => update('price', t)}
          />
          {errors.price && <Text style={styles.error}>{errors.price}</Text>}

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Menu Item</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  cancel: { color: '#fff', fontSize: 16 },
  form: { padding: SPACING.md, paddingBottom: SPACING.lg * 2 },
  label: { fontSize: 15, fontWeight: '600', color: COLORS.text, marginTop: SPACING.md, marginBottom: SPACING.sm },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
  inputError: { borderColor: COLORS.error },
  error: { color: COLORS.error, fontSize: 13, marginTop: SPACING.xs },
  chips: { flexDirection: 'row' },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
  },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.primary, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  saveText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
