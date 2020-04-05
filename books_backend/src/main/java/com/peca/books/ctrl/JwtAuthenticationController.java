package com.peca.books.ctrl;

import com.peca.books.config.jwt.JwtTokenUtil;
import com.peca.books.domain.User;
import com.peca.books.domain.dto.UserReqDto;
import com.peca.books.domain.dto.jwt.JwtRequest;
import com.peca.books.domain.dto.jwt.JwtResponse;
import com.peca.books.service.UserService;
import com.peca.books.service.impl.jwt.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping
@CrossOrigin
public class JwtAuthenticationController {



    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);



        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/reg", method = RequestMethod.POST)
    public User saveUser(@RequestBody UserReqDto user) throws Exception {
        return userDetailsService.save(user);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}