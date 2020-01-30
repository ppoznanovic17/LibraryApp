package com.peca.books.domain;

import com.peca.books.domain.dto.UserReqDto;
import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String username;
    private String password;
    private String firstName;
    private String lastName;

    private String email;
    private String phone;

    public User(UserReqDto req) {
        username = req.getUsername();
        password = req.getPassword();
        email = req.getEmail();
    }

}
