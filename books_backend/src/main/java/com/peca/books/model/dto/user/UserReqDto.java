package com.peca.books.model.dto.user;

import com.peca.books.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserReqDto {



    @Length(min = 1)
    private String username;

    @Email(message = "Email je obavezan!")
    private String email;

    @Length(min = 3, max = 16, message = "Password 3 do 16")
    private String password;

    public UserReqDto (User u) {
        username = u.getUsername();
        password = u.getPassword();
        email = u.getEmail();
    }

    public UserReqDto (String u) {
        username = u;

    }
}
