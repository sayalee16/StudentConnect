# StudentConnect
**StudentConnect** is a peer-to-peer mentorship platform that connects students with suitable mentors based on shared college, branch, current year, and learning goals. It provides a structured and secure way for juniors to seek guidance from experienced seniors.

## Tech Stack
- **Frontend**: React
- **Backend**: Spring Boot (Java)
- **Database**: MySQL
- **Authentication**: Google OAuth2, Spring Security, Role-Based Access Control
- **Architecture**: Client-Server, T3 DBMS Architecture
- **Design Patterns**: Factory, Builder, Strategy
- **Other Concepts**: DTOs, Loose Coupling, Layered Architecture

## Features
- Role-based sign up and login for Students and Mentors
- Matchmaking algorithm based on college, branch, year, goals, and availability
- Role-based access control (RBAC) using Spring Security
- Foreign key cascading updates using MySQL
- Clean and maintainable architecture using DTOs and design patterns
- Email alerts sent to students when a mentor accepts their request

## Design Patterns 

- **Factory Pattern** : Handles creation of Student or Mentor objects at runtime based on user type.
- **Builder Pattern** : Used with Lombok to simplify creation of complex objects.
- **Strategy Pattern** : Encapsulates match rules like year, branch, and goals into separate modular strategies.

## Object-Oriented Principles 

This project applies core OOP concepts to ensure clean, maintainable, and scalable code:

- **Encapsulation**:  
  DTOs and service layers hide internal logic and data structures from the outside world, exposing only what's necessary.

- **Abstraction**:  
  Interfaces like `MatchStrategy` abstract the matching logic; implementations are swappable without changing higher-level code.

- **Inheritance**:  
  `Student` and `Mentor` classes inherit from a common abstract `User` class, promoting reuse and hierarchy.

- **Polymorphism**:  
  Matching strategies and factory objects are chosen at runtime, allowing flexible and dynamic behavior.
