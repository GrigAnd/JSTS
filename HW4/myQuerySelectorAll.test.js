/**
 * @jest-environment jsdom
 */

const myQuerySelectorAll = require('./myQuerySelectorAll');

document.body.innerHTML = `
  <div id="div-id" class="div-class">
    <span id="span-id" class="span-class">
    12345678
    </span>
    <div class="inner-div">
      <div class="inner-in-inner-div">
      </div>
    </div>
  </div>
  `;

describe('myQuerySelectorAll', () => {
  it('tag', () => {
    expect(myQuerySelectorAll('div').length).toBe(3);
    expect(myQuerySelectorAll('span').length).toBe(1);
  });

  it('id', () => {
    expect(myQuerySelectorAll('#div-id').length).toBe(1);
    expect(myQuerySelectorAll('#span-id').length).toBe(1);
  });

  it('class', () => {
    expect(myQuerySelectorAll('.div-class').length).toBe(1);
  });

  it('*', () => {
    expect(myQuerySelectorAll('*').length).toBe(7); // 4 + html, head, body неявно
  });

  it('404', () => {
    expect(myQuerySelectorAll('qwerty').length).toBe(0);
  });

  it('nested', () => {
    expect(myQuerySelectorAll('.inner-div .inner-in-inner-div').length).toBe(1);
    expect(myQuerySelectorAll('div div').length).toBe(2);
  });
});

