package com.peca.books.service;

import com.peca.books.model.dto.cart.CartReqDto;
import com.peca.books.model.dto.cart.CartResDto;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface CartService {

    public List<CartResDto> returnCartItems(@RequestBody CartReqDto cart);

}
