from position import *

init_bid_spreaded = 0.84099000
init_ask_spreaded = 0.84117000

end_bid_spreaded = 0.84132000
end_ask_spreaded = 0.84226000

amount = 1304.00
leverage = 30

print(calculate_profit_loss(amount, leverage, init_bid_spreaded, end_bid_spreaded, 1, False))
print(calculate_profit_loss(amount, leverage, init_bid_spreaded, end_ask_spreaded, 1, False))
