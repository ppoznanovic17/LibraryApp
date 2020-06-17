package com.peca.books.model.dto.cart;

import com.peca.books.model.Book;

public class CartResDto {

    private int quantity;
    private Book book;

    public CartResDto() {

    }

    public Book getBook() {
        return book;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
