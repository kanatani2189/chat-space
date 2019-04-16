## messagesテーブル

| Column   | Type    | Option |
|----------|---------|--------|
| body     | text    |        |
| image    | string  |        |
| group_id | integer |null: false   foreign_key: true    |
| user_id  | integer |null: false   foreign_key: true    |

### Association 
- belongs_to :user
- belongs_to :group


## usersテーブル

| Column   | Type    | Option      |
|----------|---------|-------------|
| email    | string  | null: false |
| password | string  | null: false |
| name     | string  | null: false |


### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups


## groupsテーブル

| Column      | Type    | Option |
|-------------|---------|--------|
| name        | string  |null: false    |



### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: :users_groups


## users_groupsテーブル(中間テーブル)

| Column    | Type    | Option |
|-----------|---------|--------|
| users_id  | integer | foreign_key: true      |
| groups_id | integer | foreign_key: true      |
|           |         |        |
|           |         |        |

### Association
- belongs_to :user
- belongs_to :group



