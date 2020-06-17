package com.peca.books.model.dto.cart;

import java.util.ArrayList;
import java.util.List;

public class CartReqDto {

    private List<String> id = new ArrayList<>();
    private List<String> number = new ArrayList<>();

    CartReqDto() {

    }

    public List<String> getId() {
        return id;
    }

    public List<String> getNumber() {
        return number;
    }

    public void setId(List<String> id) {
        this.id = id;
    }

    public void setNumber(List<String> number) {
        this.number = number;
    }
}
