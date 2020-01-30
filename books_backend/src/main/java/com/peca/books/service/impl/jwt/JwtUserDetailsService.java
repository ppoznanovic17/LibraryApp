package com.peca.books.service.impl.jwt;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.peca.books.domain.User;
import com.peca.books.domain.dto.UserReqDto;
import com.peca.books.domain.dto.UserResDto;
import com.peca.books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService service;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    /*@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("javainuse".equals(username)) {
            return new User("javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }*/

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

       UserReqDto user = service.findByUsernameReq(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public User save(UserReqDto user) throws Exception {

        UserReqDto pomreq = user;
        pomreq = service.findByUsernameReq(pomreq.getUsername());
        System.out.println("pomreq : " + pomreq);
        if(pomreq.getUsername() != "error"){
            User pom = new User();

            pom.setUsername("error");
            System.out.println("pomUsername : " + pom);
            return pom;
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());

        Optional<User> opt = service.findByEmail(newUser.getEmail());

        try{
            User pom = opt.get();
            pom.setEmail("error");
            return pom;
        }catch (NoSuchElementException e){

        }


        service.save(newUser);
        return newUser;
    }
}