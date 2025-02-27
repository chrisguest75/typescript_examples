# UML

Generate UML diagrams.  

## Generate

```sh
# if on nixos
nix-shell -p nodejs_20 --command zsh

# just svg
npm exec -- tsuml2  --glob "../34_todo_api/**/*.ts" --tsconfig "../34_todo_api/tsconfig.json" --out ./out/34_todo_api.svg

# mermaid
npm exec -- tsuml2  --glob "../34_todo_api/**/*.ts" --tsconfig "../34_todo_api/tsconfig.json" --outMermaidDsl ./out/34_todo_api.mermaid

```

## Diagrams

```mermaid

classDiagram


class PingController{
            
            +getMessage() Promise~PingResponse~
        }
class PingResponse {
            <<interface>>
            +message: string
            
        }
class TodoController{
            
            +getTodo() Promise~GetTodoResponse~
+postTodo() Promise~PostTodoResponse~
        }
class Todo{
            -_id: number
-_items: Record~number, TodoItem~
            +items() TodoItem[]
+add() number
+get() TodoItem
+complete() void
+update() void
        }
class TodoItem {
            <<interface>>
            +id: number
+title: string
+details: string
+created: Date
+updated: Date
+completed: boolean
            
        }
```

## Resources

* https://github.com/demike/TsUML2/tree/master