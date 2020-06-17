package com.peca.books.service.impl;

import com.peca.books.dao.RatingDao;
import com.peca.books.model.Book;
import com.peca.books.model.Rating;
import com.peca.books.model.User;
import com.peca.books.model.dto.rating.RatingResDto;
import com.peca.books.service.BookService;
import com.peca.books.service.RatingService;
import com.peca.books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingDao dao;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    public RatingServiceImpl(){

    }

    @Override
    public RatingResDto save(Rating r) {
        long idUser = r.getUser().getId();
        long idBook = r.getBook().getId();

        Book b = bookService.findOne(idBook);
        User u = userService.findById(idUser);

        r.setBook(b);
        r.setUser(u);

        return new RatingResDto(dao.save(r));
    }

    @Override
    public void delete(Long id) {
        dao.deleteById(id);
    }

    @Override
    public List<RatingResDto> findAllByUserId(long id) {
        List<Rating> ratings =  dao.findAllByUserId(id);
        List<RatingResDto> dtos = new ArrayList<>();
        for(Rating r: ratings){

            dtos.add(new RatingResDto(r));
        }
        return dtos;

    }

    @Override
    public List<RatingResDto> findAllByBookId(long id) {
        List<Rating> ratings =  dao.findAllByBookId(id);
        List<RatingResDto> dtos = new ArrayList<>();
        for(Rating r: ratings){

            dtos.add(new RatingResDto(r));
        }
        return dtos;
    }

    @Override
    public boolean isUsersRating(long userId, long ratingId) {
        User u = userService.findById(userId);
        RatingResDto r = dao.findAllById(ratingId);

        return r.getUser().getId() == u.getId();

    }

    @Override
    public boolean userRatedBook(long userId, long bookId) {
        System.out.println("s");
        List<Rating> rating = dao.findAllByUserId(userId);
        if(rating.isEmpty()){
            System.out.println("uslo");
            return false;
        }

        boolean toReturn = false;

        for(Rating r: rating){
            if(r.getUser().getId() == userId && r.getBook().getId() == bookId) toReturn = true;
        }
        System.out.println(toReturn);
        return toReturn;

    }
}
