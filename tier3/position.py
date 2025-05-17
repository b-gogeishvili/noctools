def calculate_profit_loss(amount, leverage, open_rate, close_rate, exchange_rate, buy):
    """
    Open Rate: instrument's price when  position was opened
    Close Rate: instrument's price position was closed
    Units: units of instrument bought with some amount
    Exchange Rate: to calculate non USD currency
    Buy: True if position is BUY, False if position is SELL
    """
    units = calculate_units(amount, leverage, open_rate, exchange_rate)
    if buy:
        return (close_rate - open_rate) * units * exchange_rate
    else:
        return (open_rate - close_rate) * units * exchange_rate

def calculate_units(amount_invested, leverage, open_rate, exchange_rate):
    """
    Amount Invested: amount of $ or other currency invested in a position
    Leverage: multiplier that enables you to trade higher amounts
    Open Rate: instrument's price position was opened (bid price for
                SELL or ask price for BUY)
    Exchange Rate: to calculate non USD currency
    """
    return ((amount_invested * leverage) / open_rate) / exchange_rate


