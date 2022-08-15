
# Sse

推送消息之间通过 emitter 互相隔离

- npm run start:dev 然后 依次打开
- 不同角色用来接收 BE 消息
- [http://localhost:3035/employ](http://localhost:3035/employ)
- [http://localhost:3035/boss](http://localhost:3035/boss)
- [http://localhost:3035/normal](http://localhost:3035/normal)

- 用来触发消息
- 修改 :param 分别出发 normal employ boss
- [http://localhost:3035/sse/add-event/:param](http://localhost:3035/sse/add-event/employ)
