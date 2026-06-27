package com.smartexpense.backend.controller;

import com.smartexpense.backend.entity.Category;
import com.smartexpense.backend.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {

        return ResponseEntity.ok(
                categoryService.getAllCategories()
        );
    }

    // Get category by ID
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                categoryService.getCategory(id)
        );
    }

    // Add category
    @PostMapping
    public ResponseEntity<Category> addCategory(
            @RequestBody Category category) {

        return ResponseEntity.ok(
                categoryService.addCategory(category)
        );
    }

    // Update category
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(
            @PathVariable Long id,
            @RequestBody Category category) {

        return ResponseEntity.ok(
                categoryService.updateCategory(id, category)
        );
    }

    // Delete category
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(
            @PathVariable Long id) {

        categoryService.deleteCategory(id);

        return ResponseEntity.ok("Category Deleted Successfully");
    }

}
