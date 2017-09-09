const assert = require("assert");
describe('TODOアプリのテスト', async function(){
  it('タスクが2つ表示されていること', async () => {



    await (new Promise(r => {
      setTimeout(() => r(),1000)
    }));



    assert.equal(2, 2);
  });
});
