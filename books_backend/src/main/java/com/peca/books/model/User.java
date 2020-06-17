package com.peca.books.model;

import com.peca.books.model.dto.user.UserReqDto;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "user")
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
    private String address;

    public User(UserReqDto req) {
        username = req.getUsername();
        password = req.getPassword();
        email = req.getEmail();
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable( name = "rating")
    private List<Rating> ratings;

}
