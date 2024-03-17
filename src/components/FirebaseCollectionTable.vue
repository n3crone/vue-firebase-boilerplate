<script setup lang="ts">
import { useCollection } from 'vuefire';
import { testCollection } from '@/firebaseDb';
import { doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref } from 'vue';
import type { Item } from '@/types/item';

const items = useCollection<Item>(testCollection);
const dialog = ref(false);
const dialogDelete = ref(false);
const editedItem = ref<Item>({ key: '', value: '' });
const headers: any = [
  { title: 'Key', key: 'key' },
  { title: 'Value', key: 'value' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
];

const editItem = (item: Item) => {
  editedItem.value = { ...item, id: item.id };
  dialog.value = true;
};

const save = async () => {
  if (editedItem.value.id) {
    await updateDoc(doc(testCollection, editedItem.value.id), editedItem.value);
  } else {
    await addDoc(testCollection, editedItem.value);
  }

  closeDialogs();
};

const deleteItem = (item: Item) => {
  editedItem.value = { ...item, id: item.id };
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  await deleteDoc(doc(testCollection, editedItem.value.id));
  closeDialogs();
};

const closeDialogs = () => {
  dialog.value = false;
  dialogDelete.value = false;
  editedItem.value = { key: '', value: '' };
};
</script>

<template>
  <main>
    <v-data-table :items="items" :headers="headers">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props"> New Item </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ editedItem.id ? 'New' : 'Edit' }} item</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field v-model="editedItem.key" label="Key" />
                  </v-row>
                  <v-row>
                    <v-text-field v-model="editedItem.value" label="Value" />
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialogs"> Cancel </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialogs">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)" color="white">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </main>
</template>
