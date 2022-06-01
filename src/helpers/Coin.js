export function Coin({ name, icon, price,symbol }) {
    return <div className="coin">
       <h1>Name: {name}</h1>
        <img src={icon} />
        <h3>{price} $</h3>
        <h4>{symbol}</h4>
    </div>

}