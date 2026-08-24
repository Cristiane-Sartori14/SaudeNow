import { useRouter } from "expo-router";

import CardExercicio from "@/components/cards/CardExercicio";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { Exercicio } from "@/types/exercicio";

const exercicios: Exercicio[] = [
  {
    id: "1",
    nome: "Movimento do tornozelo",
    descricao: "Movimente os pés para cima e para baixo lentamente.",
    repeticoes: "3 séries de 10 repetições",
    posicao: "Sentado ou deitado",
  },
  {
    id: "2",
    nome: "Fortalecimento da coxa",
    descricao: "Estique e dobre o joelho lentamente.",
    repeticoes: "3 séries de 10 a 15 repetições",
    posicao: "Sentado",
  },
  {
    id: "3",
    nome: "Elevação dos braços",
    descricao: "Levante e abaixe os braços lentamente.",
    repeticoes: "2 séries de 6 a 8 repetições",
    posicao: "Sentado",
  },
  {
    id: "4",
    nome: "Flexão de tronco",
    descricao: "Incline o tronco para frente e retorne lentamente.",
    repeticoes: "3 séries de 10 repetições",
    posicao: "Sentado",
  },
  {
    id: "5",
    nome: "Levantar e sentar",
    descricao: "Levante da cadeira e sente novamente com segurança.",
    repeticoes: "2 a 3 séries de 6 a 10 repetições",
    posicao: "Em pé",
  },
  {
    id: "6",
    nome: "Movimentos da cabeça",
    descricao: "Movimente a cabeça lentamente para diferentes direções.",
    repeticoes: "10 repetições para cada movimento",
    posicao: "Sentado",
  },
];

export default function ExerciciosScreen() {
  const router = useRouter();

  return (
    <Layout>
      <ScreenHeader
        title="Exercícios"
        subtitle="Exercícios simples para auxiliar na mobilidade."
      />

      {exercicios.map((exercicio) => (
        <CardExercicio
          key={exercicio.id}
          nome={exercicio.nome}
          repeticoes={exercicio.repeticoes}
          posicao={exercicio.posicao}
          onPress={() =>
            router.push({
              pathname: "/exercicios/[id]",
              params: {
                id: exercicio.id,
              },
            })
          }
        />
      ))}
    </Layout>
  );
}
