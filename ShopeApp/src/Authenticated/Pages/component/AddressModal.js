import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
export default function AddressModal({vis}) {
  console.log(vis);
  const [visible, setVisible] = React.useState(vis);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
}
