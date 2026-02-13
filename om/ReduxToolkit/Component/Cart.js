import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';
import { removeItem, QuantityIncrease, QuantityDecrease } from '../features/CartItemSlice';
import { useDispatch } from 'react-redux';

const Cart = () => {

    const CartItems = useSelector(state => state.Cart.items)


    const dispatch = useDispatch();

    const RemoveItem = (item) => {

        dispatch(removeItem(item))
    }

    const QtyIncrease = (item) => {
        dispatch(QuantityIncrease(item))
    }

    const QtyDecrease = (item) => {
        dispatch(QuantityDecrease(item))
    }


    //calculating Tptal Price

    let sum = 0
    if (CartItems) {
        CartItems.forEach((item) => {
            sum += item.price * item.qty;

        })
        sum = sum.toFixed(2)
    }


    // console.log(sum);


    return (
        <View style={StyleSheet.container}>

            <FlatList
                data={CartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productBox}>
                        <Image source={{ uri: item.image }} style={styles.image} />

                        <View style={styles.details}>
                            <Text style={styles.name}>{item.item_name}</Text>
                            <Text style={styles.price}>₹ {item.price}</Text>
                            <Text style={styles.price}>Quantity : {item.qty}</Text>

                            <View style={styles.actionBtn}>
                                <TouchableOpacity style={styles.addtoCartbtn}

                                    onPress={() => RemoveItem(item)}
                                >
                                    <Text style={styles.addToCartText}>Remove</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actioAdd}
                                    onPress={() => QtyIncrease(item)}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>+</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actiosub}
                                    onPress={() => QtyDecrease(item)}

                                >
                                    <Text style={{ color: 'white', fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                )} />


            <View style={styles.TotalPrice}>

                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Total Price: {sum}</Text>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
        elevation: 3,

        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    details: {
        marginLeft: 12,
        justifyContent: 'center',
        flex: 1,
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },

    price: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    addtoCartbtn: {
        backgroundColor: 'red',
        height: '30',
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 5,

    },
    addToCartText: {
        color: 'white'
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    actioAdd: {
        backgroundColor: 'black',
        height: '25',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 7,
        marginLeft: 95,
    },
    actiosub: {
        backgroundColor: 'black',
        height: '25',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 7,
        marginLeft: 5,
    },
    TotalPrice: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
        elevation: 3,

        shadowOpacity: 0.1,
        shadowRadius: 5,

    }

})

export default Cart;
