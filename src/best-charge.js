'use strict';
var loadAllItems = require('./items.js');
var loadPromotions = require('./promotions.js');

function bestCharge(selectedItems) {
  var m = {};
  for (let i = 0; i < selectedItems.length; i++) {
    var temp = selectedItems[i].split('x');
    m[temp[0].trim()] = parseInt(temp[1].trim());
  }
  var res = '============= 订餐明细 =============\n';

  var items = loadAllItems();
  var promotions = loadPromotions();

  var sum = 0;
  var charge = 0;

  for (var key in m) {
    for (let i = 0; i < items.length; i++) {
      if (key == items[i].id) {
        sum += m[key] * items[i].price;

        res += items[i].name + ' x ' + m[key] + ' = ' + m[key] * items[i].price + '元\n';

        if (promotions[1].items.indexOf(key) != -1) {
          charge += m[key] * items[i].price / 2;
        }
        break;
      }
    }
  }

  if (sum >= 30) {
    res += '-----------------------------------\n使用优惠:\n';
    if (charge <= 6) {
      res += '满30减6元，省6元\n';
      res += '-----------------------------------\n';
      res += '总计：' + (sum - 6) + '元\n';
      res += '===================================\n';
    } else {
      res += '指定菜品半价(';
      for (let i = 0; i < promotions[1].items.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (promotions[1].items[i] == items[j].id) {
            res += items[j].name + '，';
            break;
          }
        }
      }
      res = res.slice(0, res.length - 1);
      // '黄焖鸡，凉皮'
      res += ')，省' + charge + '元\n';
      res += '-----------------------------------\n';
      res += '总计：' + (sum - charge) + '元\n';
      res += '===================================\n';
    }

  } else {
    if (charge > 0) {
      res += '指定菜品半价(';
      for (let i = 0; i < promotions[1].items.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (promotions[1].items[i] == items[j].id) {
            res += items[j].name + '，';
            break;
          }
        }
      }
      res = res.slice(0, res.length - 1);
      // '黄焖鸡，凉皮'
      res += ')，省' + charge + '元\n';
      res += '-----------------------------------\n';
      res += '总计：' + (sum - charge) + '元\n';
      res += '===================================\n';
    } else {
      res += '-----------------------------------\n';
      res += '总计：' + sum + '元\n';
      res += '===================================\n';
    }
  }

  return res;
}

module.exports = bestCharge;

