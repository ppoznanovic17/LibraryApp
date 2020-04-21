package com.peca.books.ctrl;

import com.peca.books.config.WebSecurityConfig;
import com.peca.books.model.User;
import com.peca.books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserCtrl {

    @Autowired
    private UserService service;

    @GetMapping(path = "/{username}")
    public User LoggedUser (@PathVariable  String username){
        Optional<User> o = service.findByUsername(username);
        User user;
        try {
            user = o.get();

        }catch (Error e){
           user = new User();
           user.setUsername("error");
        }

        return user;
    }

    @PutMapping(path = "/update/info")
    public ResponseEntity<?> profileInfo(
            @RequestBody HashMap<String, Object> mapper
    ) throws Exception{

        Integer idInt = (Integer) mapper.get("id");
        Long id = Long.valueOf(idInt);
        String username = (String) mapper.get("username");
        String firstName = (String) mapper.get("firstName");
        String lastName = (String) mapper.get("lastName");
        String phone = (String) mapper.get("phone");
        String address = (String) mapper.get("address");

        String password = (String) mapper.get("password");

        User currentUser = service.findById(id);

        if(currentUser == null) {
            System.out.println("user not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            return new ResponseEntity("User not found", HttpStatus.BAD_REQUEST);

        }



        WebSecurityConfig securityConfig = new WebSecurityConfig();


        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
        String dbPassword = currentUser.getPassword();
        System.out.println(password + "PASSSSSSSSSSSSSSS");

        if(password != null){
            System.out.println("PASS != NULLLLLL");
            if(passwordEncoder.matches(password, dbPassword)) {
                System.out.println("match !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            } else {
                System.out.println("incorect pass !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                return new ResponseEntity("Incorrect password", HttpStatus.BAD_REQUEST);
            }
        }else{
            System.out.println("incorect pass !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return new ResponseEntity("Incorrect password", HttpStatus.BAD_REQUEST);
        }

        System.out.println("CONTINUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");


        currentUser.setFirstName(firstName);
        currentUser.setLastName(lastName);
        currentUser.setPhone(phone);
        currentUser.setUsername(username);
        System.out.println(currentUser.getId()+"11111111111111111111111111111111");
        currentUser.setId(id);
        currentUser.setAddress(address);
        System.out.println(currentUser.getId()+"222222222222222222222222222222222");



        return new ResponseEntity(service.save(currentUser), HttpStatus.OK);
    }


    @PutMapping(path = "/update")
    public ResponseEntity<?> updatePassword(@RequestBody HashMap<String, Object> mapper)throws Exception{
        Integer idInt = (Integer) mapper.get("id");
        Long id = Long.valueOf(idInt);
        String newPassword = (String) mapper.get("newPassword");
        String currentPassword = (String) mapper.get("currentPassword");


        User currentUser = service.findById(id);


        WebSecurityConfig securityConfig = new WebSecurityConfig();

        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
        String dbPassword = currentUser.getPassword();
        System.out.println(currentPassword);
        System.out.println(dbPassword);

        if(currentUser == null) {
            System.out.println("user not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            return new ResponseEntity("User not found", HttpStatus.BAD_REQUEST);

        }


        if(currentPassword != null){
            System.out.println("PASS != NULLLLLL");
            if(currentPassword.equals(dbPassword)) {
                System.out.println("match !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            } else {
                System.out.println("incorect pass !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                return new ResponseEntity("Incorrect password", HttpStatus.BAD_REQUEST);
            }
        }else{
            System.out.println("incorect pass hoho !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return new ResponseEntity("Incorrect password", HttpStatus.BAD_REQUEST);
        }





        String newPasswordEncoded = passwordEncoder.encode(newPassword);

        currentUser.setPassword(newPasswordEncoded);

        return new ResponseEntity(service.save(currentUser), HttpStatus.OK);
    }


}
