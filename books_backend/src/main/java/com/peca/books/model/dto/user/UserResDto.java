package com.peca.books.model.dto.user;

import com.peca.books.model.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Data
public class UserResDto {

    private long id;
    private String username;
    private String email;

    private String firstName;
    private String lastName;

    private String phone;

    public UserResDto (User user) {
        id = user.getId();
        username = user.getUsername();
        email = user.getEmail();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        phone = user.getPhone();

    }

    public UserResDto (String username) {
        this.username = username;


    }



}
