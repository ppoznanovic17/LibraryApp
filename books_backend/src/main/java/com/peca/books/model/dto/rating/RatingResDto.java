package com.peca.books.model.dto.rating;

import com.peca.books.model.Book;
import com.peca.books.model.Rating;
import com.peca.books.model.User;
import com.peca.books.model.dto.book.BookResDto;
import com.peca.books.model.dto.user.UserResDto;
import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RatingResDto {

    private long id;

    private int rating;

    private String content;

    private UserResDto user;

    private BookResDto book;

    public RatingResDto(Rating r) {
        id = r.getId();
        rating = r.getRating();
        content = r.getContent();
        user = new UserResDto(r.getUser());
        book = new BookResDto(r.getBook());
    }


}
