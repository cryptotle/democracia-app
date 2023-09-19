import HomeActions from "@/components/HomeActions";
import Header from "@/components/common/Header/header.component";
import { colors } from "@/theme/colors";
import Head from "next/head";
import Link from "next/link";

export default async function Home() {
  
  return (
    <>
      <Head>
        {/* Agrega el favicon aquí */}
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Header />
      <section style={{background: colors.primary}} className="p-5">
        
        <div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md  py-2 px-2 flex flex-col justify-center items-center">
          <HomeActions />
        </div>

        <div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
          <p className="text-xl mb-10 font-semibold">
          What is Democracy DAO / Qué es Democracia DAO
          </p>
          <p className="text-base">
          It is a Decentralized Autonomous Organization (DAO) created to promote fair and transparent elections in Argentina.
          <br />
          <br />
          Es una Organización Autónoma Descentralizada (DAO) que se forma para promover elecciones justas y transparentes en Argentina. 
          </p>
        </div>

        <div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
          <p className="text-xl mb-10 font-semibold">
          Why it is needed / Por qué es necesaria
          </p>
          <p className="text-base">
          Argentina’s voting system is quite outdated. Citizens vote with slips of paper that carry the names only of a given party’s candidates, 
          like the coupon ballots used in the nineteenth-century United States. Each political party prints, distributes and supplies 
          its own ballots during Election Day. This voting &quot;technology&quot; ... implies that political parties often require <b>thousands of poll-watchers 
           to avoid ballot theft </b>and to monitor the count in each of the polling stations. 
          <i> (<a style={{ textDecoration: 'underline' }} target="_blank" href="https://blog.oup.com/2013/10/argentina-elections-politics-history-2013-faq/">
          Argentina’s elections: A Q&A, Oxford University Press Blog</a>)</i>
          <br />
          <br />
          El sistema de votación argentino es arcaico. Se vota con boletas por partido. 
          Los partidos imprimen sus propias boletas que deben distribuir el dia de la elección. 
          Esta &quot;tecnología&quot; de votación implica que los partidos necesitan miles de fiscales voluntarios para evitar el robo de boletas 
          y controlar el conteo de votos en cada mesa.
          </p>
        </div>

        <div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
          <p className="text-xl mb-10 font-semibold">
          How it works
          </p>
          <p className="text-base">
          Democracy DAO only purpose is to incentivize poll-watchers participation in order to guarantee a fair and transparent election.
            <br />
            <br />
            <b>Contributors</b> are anonymous Ethereum addresses that choose to deposit ETH tokens to reward volunteer poll-watchers 
            supporting a fair and transparent elections. By depositing ETH tokens into the Democracy DAO contract, 
            you will receive “DDAO” tokens representing your contribution to the DAO Contract. Contributions are anonymous 
            but public in the Ethereum blockchain.
            <br />
            <br />
            <b>Poll-watchers</b> can receive the reward for transparent elections. 
            Poll-watchers must register in the application, and must present proof of their identity, their designation as party poll-watchers for a particular polling station, 
            and proof of their participation. If the poll station operates transparently and without incidents, 
            registered poll-watchers for that polling station will receive a reward in the form of crypto tokens equivalent to 25 USDT tokens.
            <br />
            <br />
            <b>Voters</b> are individuals voters who register in the application, and who can report their experience after voting. 
            If there are negative reports for a polling station, the poll-watchers for that station will not receive the reward.
          </p>
        </div>

        <div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
          <p className="text-xl mb-10 font-semibold">
          Cómo funciona
          </p>
          <p className="text-base">
            Democracia DAO existe únicamente para incentivar la participación de los fiscales voluntarios garantizando una elección justa y transparente.
            <br />
            <br />
            <b>Los contribuyentes</b> son direcciones anónimas de ethereum que eligen colaborar con tokens ETH para luego premiar a los fiscales de mesa voluntarios 
            que ayuden a una elección justa y transparente. Al depositar tokens ETH en el contrato de Democracia DAO, recibirán tokens “DDAO” 
            representando su contribución en el contrato de la DAO. Las contribuciones son anónimas pero públicas en la blockchain Ethereum. 
            <br />
            <br />
            <b>Los fiscales</b> son fiscales de mesa voluntarios que quieran registrarse para recibir el premio por elecciones transparentes. 
            Los fiscales se deben registrar en la aplicación, debiendo presentar prueba de su identidad, de su poder como fiscales de partido para una mesa en particular 
            y prueba de su participación. Si la mesa opera en forma transparente y sin incidentes, recibirán un reconocimiento en forma de tokens crypto equivalentes a 25 tokens USDT. 
            <br />
            <br />
            <b>Los votantes</b> son votantes individuales que se registran en la aplicación, y que pueden reportar su experiencia durante la votación. 
            Si hay reportes negativos para una mesa, los fiscales voluntarios de la misma no recibirán el premio
          </p>
        </div>

<div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
<p className="text-xl mb-10 font-semibold">
          How can you help
          </p>
          <p className="text-base">
    As a <b>contributor</b> you can donate ETH to the fair and transparent election prize pool. You can also invite more contributors by sharing this url: <b>bitju.app</b>. 
          </p>
        </div>

        <div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
          <p className="text-xl mb-10 font-semibold">
          Como podés ayudar
          </p>
          <p className="text-base">
Invitá a más gente a participar compartiendo esta esta app: <b>bitju.app</b>
<br />
<br />
Como <b>contribuyente</b>: podés donar desde 0.01 ETH para el pozo de recompensas por elecciones justas y transparentes.
<br />
<br />
Como <b>fiscal</b>: Siendo voluntario para fiscalizar para alguno de los partidos participantes, asegurandote que las elecciones en tu mesa 
se produzcan de forma transparente y sin incidentes. Registrate en la aplicación para recibir el premio.
<br /><br />
Como <b>votante</b>: Registrate en la aplicación y contanos cómo fue tu experiencia votando. Ayudanos a premiar a quienes 
  garantizan elecciones justas y transparentes.
  </p>
  </div>

  <div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
          <p className="text-xl mb-10 font-semibold">
          F.A.Q.
          </p>
          <p className="text-base">
Can I be a contributor, poll-watcher and voter?
<br />    Yes, of course, poll-watchers are voters too, and contribution is permissionless.

<br /><br />What happens if the contributions are low?
<br />    If contributions are less than the equivalent of 25,000 USDT tokens, the DAO is dissolved.

<br /><br />What happens if not enough poll-watchers register in the app or if there are too many fraudulent reports?
<br />    In that case the DAO will not operate and will be dissolved starting April 1, 2024.

<br /><br />What happens if due to unexpected obstacles the DAO cannot operate and does not distribute the rewards?
<br />The smart contract code dictates that the DAO automatically enters dissolution mode on April 1, 2024.

<br /><br />What happens when the DAO goes enters dissolution mode?
<br />Upon entering dissolution mode, the DAO smart contract will allow contributors to convert their DDAO tokens into their original contribution value plus staking rewards (approximately 4% annually).

<br /><br />What happens if there are too many registered poll-watchers and the contributions are not enough to pay the rewards?
<br />The rewards are distributed on a first-registered, first-served basis.

<br /><br />What happens if there are more contributions than rewards to be distributed?
<br />The balance remains in the smart contract and DDAO holders can burn the tokens to recover their proportional share of the remaining balance, 
starting april 1st, 2024

<br /><br />Is the smart contract verified?
<br />    Yes, it responds to ERC4626 stardard and it is deployed here: 0x69e3a362ffD379cB56755B142c2290AFbE5A6Cc8

<br /><br />Who controls prize distribution?
<br />    Prize distribution authority is a Gnosis-Safe multisig here 0x24c3Af57BDa2406614dc40151f888f97d6c534Bb.
Main contributors will be added to the multisig on demand.

<br /><br />More questions?
<br />    Join <Link style={{ textDecoration: 'underline' }} target="_blank" href="https://discord.gg/uqvebUXp3z">Democracia DAO Discord server</Link>
              </p>
    </div>

<div className="max-w-4xl mb-5 mx-auto bg-ct-dark-100 rounded-md py-5 px-8 justify-center items-center">
  <p className="text-xl mb-10 font-semibold">
  Preguntas Frecuentes
          </p>
          <p className="text-base">
¿Puedo ser contribuyente, fiscal y votante? 
<br />
    Si claro, los fiscales son votantes también, y cualquiera puede contribuir sin restricción alguna. 
    <br /><br />
¿Qué pasa si las contribuciones son pocas? 
<br />
    Si las contribuciones son menores al equivalente a 25.000 tokens USDT, la DAO se disuelve.
    <br /><br />
¿Qué pasa si no se registran suficientes fiscales o si hay demasiados reportes fraudulentos? 
<br />
        En ese caso la DAO no operará y se disuelve por el paso del tiempo.
        <br /><br />
¿Qué pasa si por algún inconveniente la DAO no puede operar y no reparte los premios? 
<br />
        El código del contrato inteligente dicta que la DAO entra en modo disolución automáticamente el 1 de abril de 2024.
        <br /><br />
¿Qué pasa cuando la DAO entra en modo disolución? 
<br />    Al entrar en modo “disolución”, el contrato inteligente de la DAO permitirá a los contribuyentes cambiar sus DDAO por tokens representando ETH, recuperando el valor de su contribución original más recompensas por staking (4% anual aproximadamente)
<br /><br />
¿Qué pasa si hay muchos fiscales y las contribuciones no alcanzan para pagar los premios? 
<br />    Se distribuyen los premios por orden de inscripción de los fiscales

<br /><br />¿Qué pasa si hay más contribuciones que los premios a distribuir? 
<br />    El saldo queda en el contrato inteligente y los poseedores de DDAO pueden quemarlos para recuperar su parte proporcional del saldo a partir del 1 de Abril de 2024. 

<br /><br />¿Está el contrato inteligente verificado?
<br />    Si, el contrato inteligente responde al standard ERC4626 y está verificado en la dirección 0x69e3a362ffD379cB56755B142c2290AFbE5A6Cc8

<br /><br />¿Quien efectúa la distribución de los premios?
<br />    La distribución la realizará un contrato inteligente multi-firma Gnosis-Safe en la dirección 0x24c3Af57BDa2406614dc40151f888f97d6c534Bb.
Los contribuyentes principales que lo deseen serán agregardos a la multi-firma.

<br /><br />¿Más preguntas?
<br />    Unite al <Link style={{ textDecoration: 'underline' }} target="_blank" href="https://discord.gg/uqvebUXp3z">Discord Server de Democracia DAO</Link>

</p>
        </div>


      </section>
    </>
  );
}
