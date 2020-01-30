package com.peca.books.ctrl;

import com.peca.books.domain.dto.UserReqDto;
import com.peca.books.domain.dto.UserResDto;
import com.peca.books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @Autowired
    UserService userService;

    @GetMapping(path = "/req/{username}")
    public UserReqDto a(@PathVariable String username){
        return userService.findByUsernameReq(username);
    }

    @GetMapping(path = "/res/{username}")
    public UserResDto b(@PathVariable String username){
        return userService.findByUsernameRes(username);
    }
}
