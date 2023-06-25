# rest_full_api-muvies

Сервер использовать Nest.js.
Данные о фильмах храняться в MongoDB. Данные содержать id, название, описание, год.
Авторизация пользователей и возможность добавления/изменения/удаления фильмов только авторизованными пользователями.

API имеет следующие эндпоинты:

#### movies: 
* GET /movies - получает список всех фильмов;
* POST /movies - добавляет новый фильм; 
{
    title
    description
    year
}
* GET /movies/{id} - получает информацию о фильме по его id;
{
    title
    description
    year
}
* PUT /movies/{id} - обновляет информацию о фильме по его id;
* DELETE /movies/{id} - удаляет фильм по его id.

#### users:
* POST /users/registration - регестрирует пользователя - принимает 
{
    name,
    email,
    password
}
* POST /users/login - вход в акаунт
