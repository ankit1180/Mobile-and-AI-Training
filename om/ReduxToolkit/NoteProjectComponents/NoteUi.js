import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { database } from '../Database/Database';

const NoteUi = () => {

    const [addNoteShow, setAddNoteShow] = useState(false); //for AddNew and Edit page opening
    const [notes, setNotes] = useState([]); //data fetching 
    const [noteInput, setNoteInput] = useState(''); //taking noteinput
    const [descInput, setDescInput] = useState(''); //description input
    const [isAddMode, setIsAddMode] = useState(true);
    const [noteError, setNoteError] = useState(''); //note error msg showing
    const [descError, setDescError] = useState(''); //description error msg showing
    const [selectedId, setSelectedId] = useState(null); //getting id to edit



    //  Fetch Notes 
    useEffect(() => {
        const notesCollection = database.collections.get('notes');

        const subscription = notesCollection.query().observe().subscribe(noteList => {
            const data = noteList.map(item => item._raw);
            setNotes(data);
        });

        return () => subscription.unsubscribe();
    }, []);



    // Add Note
    const addNote = async () => {
        setNoteError('');
        setDescError('');

        if (!noteInput.trim()) {
            setNoteError('Please enter note');
            return;
        }

        if (!descInput.trim()) {
            setDescError('Please enter description');
            return;
        }

        try {
            await database.write(async () => {
                await database.get('notes').create(note => {
                    note.note = noteInput;
                    note.description = descInput;
                });
            });

            resetForm();
        } catch (error) {
            console.log('Add error:', error);
        }
    };



    //  Edit
    const openEdit = item => {
        setAddNoteShow(true);
        setIsAddMode(false);
        setSelectedId(item.id);
        setNoteInput(item.note);
        setDescInput(item.description);
    };


    const updateNote = async () => {
        if (!noteInput.trim() || !descInput.trim()) return;

        try {
            await database.write(async () => {
                const note = await database.get('notes').find(selectedId);
                await note.update(n => {
                    n.note = noteInput;
                    n.description = descInput;
                });
            });

            resetForm();
        } catch (error) {
            console.log('Update error:', error);
        }
    };

    // Delete Note
    const deleteNote = async (id) => {
        try {
            await database.write(async () => {
                const note = await database.get('notes').find(id);
                await note.destroyPermanently();
            });
        } catch (error) {
            
            console.log('Delete error:', error);
        }
    };


    // Reset Form

    const resetForm = () => {
        setNoteInput('');
        setDescInput('');
        setNoteError('');
        setDescError('');
        setSelectedId(null);
        setIsAddMode(true);
        setAddNoteShow(false);
    };


    return (
        <View style={styles.container}>


            {addNoteShow ? (
                <View>
                    <View style={styles.noteContainer}>
                        <Text style={styles.heading}>
                            {isAddMode ? 'Add New Note' : 'Update Note'}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Note"
                            value={noteInput}
                            onChangeText={setNoteInput}
                        />

                        {noteError ? <Text style={styles.error}>{noteError}</Text> : null}

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Description"
                            value={descInput}
                            onChangeText={setDescInput}
                        />

                        {descError ? <Text style={styles.error}>{descError}</Text> : null}


                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={isAddMode ? addNote : updateNote}>
                            <Text style={{ color: 'white' }}>
                                {isAddMode ? 'Add Note' : 'Update Note'}
                            </Text>
                        </TouchableOpacity>



                        <TouchableOpacity style={styles.cancelBtn} onPress={resetForm}>
                            <Text style={{ color: 'red' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            ) : (


                <View style={{ flex: 1 }}>

                    <FlatList
                        data={notes}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.noteItem}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.noteTitle}>
                                        Note: {item.note}
                                    </Text>
                                    <Text>{item.description}</Text>
                                </View>

                                <View style={styles.buttonRow}>
                                    <TouchableOpacity onPress={() => openEdit(item)}>
                                        <Text style={styles.edit}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => deleteNote(item.id)}>
                                        <Text style={styles.delete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />


                    <Button
                        title="Add New Note"
                        color="red"
                        onPress={() => {
                            setAddNoteShow(true);
                            setIsAddMode(true);
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default NoteUi;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noteContainer: {
        width: '90%',
        height: 450,
        backgroundColor: 'white',
        elevation: 5,
        margin: 20,
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        color: 'red',
    },
    input: {
        width: '95%',
        height: 80,
        elevation: 4,
        marginTop: 15,
        padding: 10,
    },
    addBtn: {
        marginTop: 40,
        width: '90%',
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    cancelBtn: {
        marginTop: 10,
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    noteItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    edit: {
        color: 'blue',
        marginRight: 10,
        fontWeight: 'bold',
    },
    delete: {
        color: 'red',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});
