import { StarOutlined } from '@ant-design/icons';
import { Card } from'antd';
import Meta from 'antd/es/card/Meta';


const PokemonCard = ({name, image, abilities})=>{
    const abilitiesName = abilities?.map(a=>a.ability.name);
    const abilitiesResume = abilitiesName.join(',');
    return <Card
        title={name}
        cover={<img src={image} alt={name} />}
        extra={<StarOutlined />}
    >
        <Meta description={abilitiesResume}/>
    </Card>
}

export default PokemonCard;