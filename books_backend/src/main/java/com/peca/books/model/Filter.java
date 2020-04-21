package com.peca.books.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor @Builder
@Getter@Setter
public class Filter {

    private String sort;
    private int minPrice;
    private int maxPrice;
    private String language;
    private String type;
    private String category;

}
