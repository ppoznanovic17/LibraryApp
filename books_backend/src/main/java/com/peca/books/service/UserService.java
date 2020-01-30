package com.peca.books.service;

import com.peca.books.domain.User;
import com.peca.books.domain.dto.UserReqDto;
import com.peca.books.domain.dto.UserResDto;

import java.util.Optional;

public interface UserService {

    UserResDto findByUsernameRes(String username);

    UserReqDto findByUsernameReq(String username);

    User findById(Long id);

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String username);

    UserResDto save(User userReq) throws  Exception;





}
