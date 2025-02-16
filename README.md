# Testowanie i Jakość Oprogramowania - Aplikacja do Kontrolowania Kalendarza

## Autor
Kamil Pacuła

## Temat projektu
Aplikacja do Kontrolowania Kalendarza

## Opis projektu
Aplikacja pozwala użytkownikom na rejestrowanie, logowanie, zarządzanie wydarzeniami w kalendarzu. Użytkownicy mogą tworzyć, edytować, usunąć wydarzenia, a także przeglądać je na podstawie zalogowanego konta.

## Uruchomienie projektu

### Backend:
Aby uruchomić backend projektu, użyj poniższego polecenia: node index.js
### Frontend:
Aby uruchomić frontend projektu, użyj poniższego polecenia: npm start

## Testy

### Lista testów integracyjnych

1. **testy integracyjne autoryzacji** (tests/integration/auth.integration.test.js)
   - Test rejestracji użytkownika.
   - Test logowania użytkownika.
   - Test logowania z błędnymi danymi.
   - Test braku emaila w formularzu rejestracyjnym.
   - Test braku hasła w formularzu rejestracyjnym.
   - Test rejestracji z istniejącym emailem.

2. **testy integracyjne wydarzeń** (tests/integration/events.integration.test.js)
   - Test tworzenia wydarzenia.
   - Test pobierania wydarzeń.
   - Test braku tytułu w wydarzeniu.
   - Test braku czasu rozpoczęcia w wydarzeniu.
   - Test aktualizacji wydarzenia.
   - Test błędnego ID przy aktualizacji wydarzenia.
   - Test usuwania wydarzenia.
   - Test usuwania nieistniejącego wydarzenia.
   - Test braku tokena przy tworzeniu wydarzenia.
   - Test wygasłego tokena przy pobieraniu wydarzeń.

### Lista testów jednostkowych

1. **testy jednostkowe autoryzacji** (tests/unit/auth.test.js)
   - Test poprawnej rejestracji.
   - Test istniejącego użytkownika przy rejestracji.
   - Test poprawnego logowania.
   - Test logowania z błędnymi danymi.
   - Test walidacji danych w formularzu rejestracyjnym.
   - Test poprawności generowania tokena po logowaniu.
   - Test tokena z wygasłą sesją.
   - Test błędu przy próbie rejestracji z użyciem istniejącego adresu e-mail.
   - Test brakujących pól w formularzu rejestracyjnym.
   - Test prawidłowego wywołania endpointu po zalogowaniu.
  
2. **testy jednostkowe middleware** (tests/unit/authMiddleware.test.js)
   - Test braku tokena w nagłówku.
   - Test poprawnego działania middleware z tokenem.
   - Test nieprawidłowego tokena.
   - Test poprawności kodu błędu 401 w przypadku braku tokena.
   - Test generowania błędu przy próbie dostępu bez autoryzacji.
   - Test poprawności weryfikacji tokenu w nagłówku.
   - Test odrzucenia nieprawidłowego tokena.
   - Test reakcji na pusty nagłówek autoryzacji.
   - Test obsługi błędu w przypadku złamania zasad autoryzacji.
   - Test przypadku, w którym token jest za krótki.

3. **testy jednostkowe wydarzeń** (tests/unit/events.test.js)
   - Test tworzenia wydarzenia.
   - Test pobierania wydarzeń.
   - Test braku tytułu w wydarzeniu.
   - Test braku czasu rozpoczęcia w wydarzeniu.
   - Test usuwania wydarzenia.
   - Test usuwania nieistniejącego wydarzenia.
   - Test aktualizacji wydarzenia.
   - Test błędnych danych w formularzu wydarzenia.
   - Test walidacji przy dodawaniu wydarzenia.
   - Test braku uprawnień przy próbie modyfikacji wydarzenia.

   ## Przypadki testowe (Test Case)

**Rejestracja nowego użytkownika:**  
1. Otwórz aplikację  
2. Przejdź do rejestracji  
3. Wypełnij formularz  
4. Kliknij "Zarejestruj"  
**Oczekiwany wynik:** Konto zostaje utworzone

**Logowanie użytkownika:**  
1. Otwórz aplikację  
2. Przejdź do logowania  
3. Podaj poprawne dane  
4. Kliknij "Zaloguj"  
**Oczekiwany wynik:** Logowanie powiodło się

**Logowanie z błędnym hasłem:**  
1. Otwórz aplikację  
2. Przejdź do logowania  
3. Podaj błędne hasło  
4. Kliknij "Zaloguj"  
**Oczekiwany wynik:** Komunikat "Błędne dane"

**Dodawanie wydarzenia:**  
1. Zaloguj się  
2. Kliknij "Dodaj wydarzenie"  
3. Wypełnij dane  
4. Kliknij "Zapisz"  
**Oczekiwany wynik:** Wydarzenie dodane

**Pobieranie wydarzeń:**  
1. Zaloguj się  
2. Przejdź do kalendarza  
**Oczekiwany wynik:** Wydarzenia są widoczne

**Usuwanie wydarzenia:**  
1. Zaloguj się  
2. Przejdź do kalendarza  
3. Kliknij "Usuń"  
**Oczekiwany wynik:** Wydarzenie znika

**Brak tokena:**  
1. Wyloguj się  
2. Przejdź do kalendarza  
**Oczekiwany wynik:** Komunikat "Nieautoryzowany"

**Token wygasł:**  
1. Zaloguj się  
2. Poczekaj 1h  
3. Przejdź do kalendarza  
**Oczekiwany wynik:** Komunikat "Sesja wygasła"

**Próbuj dodać wydarzenie bez tytułu:**  
1. Kliknij "Dodaj"  
2. Nie wpisuj tytułu  
3. Kliknij "Zapisz"  
**Oczekiwany wynik:** Błąd walidacji

**Próbuj logować bez internetu:**  
1. Wyłącz internet  
2. Kliknij "Zaloguj"  
**Oczekiwany wynik:** Komunikat o błędzie

## Technologie użyte w projekcie
- **Node.js** – Backend aplikacji
- **Express** – Framework dla Node.js
- **JWT** – JSON Web Token dla autoryzacji
- **PostgreSQL** – Relacyjna baza danych
- **Supertest** – Narzędzie do testowania API
- **Jest** – Framework testowy
