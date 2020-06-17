package com.peca.books.ctrl;

import com.peca.books.model.dto.cart.CartReqDto;
import com.peca.books.model.dto.cart.CartResDto;
import com.peca.books.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cart")
public class CartCtrl {

    @Autowired
    private CartService cartService;

    public CartCtrl() {

    }


    @PostMapping( path = "/getCart")
    public List<CartResDto> returnCartItems(@RequestBody CartReqDto cart){
        return cartService.returnCartItems(cart);
    }

}
