package com.peca.books.service.impl;

import com.peca.books.model.Book;
import com.peca.books.model.dto.cart.CartReqDto;
import com.peca.books.model.dto.cart.CartResDto;
import com.peca.books.service.BookService;
import com.peca.books.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private BookService bookService;

    public CartServiceImpl() {

    }

    @Override
    public List<CartResDto> returnCartItems(CartReqDto cart) {
        List<CartResDto> cartResDtoList =  new ArrayList<>();
        for(int i=0; i < cart.getId().size(); i++){
            String[] splitPrefix = cart.getId().get(i).split("-");
            Book b = bookService.findOne(Long.parseLong(splitPrefix[1]));
            CartResDto res = new CartResDto();
            res.setQuantity(Integer.parseInt(cart.getNumber().get(i)));
            res.setBook(b);
            cartResDtoList.add(res);
        }
        return cartResDtoList;
    }
}
