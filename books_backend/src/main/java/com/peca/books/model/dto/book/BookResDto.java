package com.peca.books.model.dto.book;

import com.peca.books.model.Book;
import lombok.*;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookResDto {

    private Long id;

    private String title;
    private String author;
    private String publisher;
    private String publicationDate;
    private String language;
    private String category;
    private int numberOfPages;
    private String format;
    private String isbn;
    private double shippingWeight;
    private double listPrice;
    private double ourPrice;
    private double newPrice;
    private double discount;

    private int numberOfSold;
    private boolean active=true;

    private String description;
    private int inStockNumber;


    private String bookImage;

    public BookResDto(Book b){
        id = b.getId();
        title = b.getTitle();
        author = b.getAuthor();
        publisher = b.getPublisher();
        publicationDate = b.getPublicationDate();
        language = b.getLanguage();
        category = b.getCategory();
        numberOfPages = b.getNumberOfPages();
       format = b.getFormat();
       isbn = b.getIsbn();
       shippingWeight = b.getShippingWeight();
       ourPrice = b.getOurPrice();
       newPrice = b.getNewPrice();
       numberOfSold = b.getNumberOfSold();
       active = b.isActive();
       description = b.getDescription();
       inStockNumber = b.getInStockNumber();
       bookImage = b.getBookImage();
        discount = b.getDiscount();
    }


}
