package com.peca.books.model;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity(name = "book")
public class Book implements Serializable {



    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
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

    @Column(columnDefinition="text")
    private String description;
    private int inStockNumber;


    private String bookImage;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable( name = "rating")
    private List<Rating> ratings;




}
