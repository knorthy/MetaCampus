import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SignupBottomSheet = forwardRef(({ onSelect }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handlePick = (type) => {
    onSelect?.(type);
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
      <View style={styles.wrapper}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Choose how you want to get started</Text>

          <TouchableOpacity style={[styles.optionButton, styles.primary]} onPress={() => handlePick('student')}>
            <Text style={styles.optionText}>Student</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionButton, styles.secondary]} onPress={() => handlePick('organization')}>
            <Text style={styles.optionText}>Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel} onPress={() => setVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default SignupBottomSheet;

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    height: '50%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'center',
  },
  handle: { width: 40, height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 18, textAlign: 'center' },
  optionButton: { width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  primary: { backgroundColor: '#4CAF50' },
  secondary: { backgroundColor: '#2E7D32' },
  optionText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cancel: { marginTop: 14 },
  cancelText: { color: '#666' },
});