import { Injectable } from '@nestjs/common';
import { EventRespDTO, Invite } from './dto/event.resp.dto';
import event from "./event.json"
import invites from './invites.json'
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class AppService {
  TEST_TYPE = {
    PLAIN_TO_CLASS: 'plainToClass',
    EXCLUDE: 'exclude',
    EXPOSE_DO_EXCLUDE:'expose'

  }
  constructor() {
    // this.testTransFrom(this.TEST_TYPE.PLAIN_TO_CLASS)
    // this.testTransFrom(this.TEST_TYPE.EXCLUDE)
    this.testTransFrom(this.TEST_TYPE.EXPOSE_DO_EXCLUDE)
  }

  async getEvent(): Promise<EventRespDTO> {


    return plainToClass(EventRespDTO, {
      event: {},
      invites: []
    })

  }

  testTransFrom(name: String) {
    switch (name) {
      case this.TEST_TYPE.PLAIN_TO_CLASS:
        {
          let plainObj = { event, invites }
          console.log('简单的对象数据', plainObj)
          let result = plainToClass(EventRespDTO, { event, invites });
          console.log("转换为类之后的对象数据", result)
          console.log("具备了类中的值", result.getInvite())
        }
        break;
      case this.TEST_TYPE.EXCLUDE:
        {
          const result = plainToClass(EventRespDTO, { event, invites });
          console.dir(result)
          // const excludeInvite = plainToClass(Invite, result.getInvite())
          // console.log(excludeInvite)
          console.log(result.getInvite())
        }
        break
      case this.TEST_TYPE.EXPOSE_DO_EXCLUDE:
        {
          let result = plainToClass(EventRespDTO, { event, invites }, {groups:['admin']});
          console.log('Invite 排除了 email， 并且 admin 暴露了user的emails',result.getInvite())

          result = plainToClass(EventRespDTO, { event, invites }, {groups:['user']});
          console.log("Invite 排除了email， user 因为组别不对 所以隐藏了email",result.getInvite())
          console.log("最终再把数据还原，进行返回",classToPlain(result).invites)
        }
        break

      default:
        break;
    }
  }
}
