import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/common/PrimaryButton";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";
import ConsultaRepository from "@/repositories/ConsultaRepository";
import { Consulta } from "@/types/consulta";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const DIAS_SEMANA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

interface DiaCalendario {
  numero: number;
  data: string;
  outroMes: boolean;
}

export default function ConsultasScreen() {
  const router = useRouter();

  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [consultaSelecionada, setConsultaSelecionada] = useState<number | null>(
    null,
  );

  const hoje = new Date();

  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());

  useFocusEffect(
    useCallback(() => {
      carregarConsultas();
    }, []),
  );

  async function carregarConsultas() {
    try {
      const lista = await ConsultaRepository.listar();
      setConsultas(lista);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar as consultas.");
    }
  }

  async function excluirConsulta(id: number) {
    Alert.alert("Excluir consulta", "Deseja realmente excluir esta consulta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await ConsultaRepository.remover(id);

            setConsultaSelecionada(null);

            await carregarConsultas();

            Alert.alert("Sucesso", "Consulta excluída com sucesso.");
          } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível excluir a consulta.");
          }
        },
      },
    ]);
  }

  function mudarMes(direcao: number) {
    setConsultaSelecionada(null);

    if (direcao === 1) {
      if (mesAtual === 11) {
        setMesAtual(0);
        setAnoAtual((ano) => ano + 1);
      } else {
        setMesAtual((mes) => mes + 1);
      }

      return;
    }

    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual((ano) => ano - 1);
    } else {
      setMesAtual((mes) => mes - 1);
    }
  }

  function formatarData(dia: number, mes: number, ano: number): string {
    return [
      String(dia).padStart(2, "0"),
      String(mes + 1).padStart(2, "0"),
      ano,
    ].join("/");
  }

  function gerarCalendario(): DiaCalendario[] {
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);

    const quantidadeDias = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    const dias: DiaCalendario[] = [];

    // Dias do mês anterior
    if (diaSemanaInicio > 0) {
      const ultimoDiaMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();

      for (let i = diaSemanaInicio - 1; i >= 0; i--) {
        const numero = ultimoDiaMesAnterior - i;

        const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1;

        const anoAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual;

        dias.push({
          numero,
          data: formatarData(numero, mesAnterior, anoAnterior),
          outroMes: true,
        });
      }
    }

    for (let dia = 1; dia <= quantidadeDias; dia++) {
      dias.push({
        numero: dia,
        data: formatarData(dia, mesAtual, anoAtual),
        outroMes: false,
      });
    }

    const diasRestantes = (7 - (dias.length % 7)) % 7;

    for (let dia = 1; dia <= diasRestantes; dia++) {
      const proximoMes = mesAtual === 11 ? 0 : mesAtual + 1;

      const proximoAno = mesAtual === 11 ? anoAtual + 1 : anoAtual;

      dias.push({
        numero: dia,
        data: formatarData(dia, proximoMes, proximoAno),
        outroMes: true,
      });
    }

    return dias;
  }

  const diasCalendario = useMemo(() => gerarCalendario(), [mesAtual, anoAtual]);

  const consultasDoMes = useMemo(() => {
    const mes = String(mesAtual + 1).padStart(2, "0");
    const prefixo = `${mes}/`;

    return consultas
      .filter((consulta) => {
        const partes = consulta.data.split("/");

        if (partes.length !== 3) {
          return false;
        }

        const mesConsulta = partes[1];
        const anoConsulta = Number(partes[2]);

        return mesConsulta === mes && anoConsulta === anoAtual;
      })
      .sort((a, b) => {
        const [diaA] = a.data.split("/").map(Number);
        const [diaB] = b.data.split("/").map(Number);

        if (diaA !== diaB) {
          return diaA - diaB;
        }

        return a.horario.localeCompare(b.horario);
      });
  }, [consultas, mesAtual, anoAtual]);

  function temConsultaNaData(data: string): boolean {
    return consultas.some((consulta) => consulta.data === data);
  }

  function selecionarConsulta(id: number) {
    setConsultaSelecionada((atual) => (atual === id ? null : id));
  }

  function formatarDataCurta(data: string): string {
    const partes = data.split("/");

    if (partes.length !== 3) {
      return data;
    }

    return `${partes[0]}/${partes[1]}`;
  }

  function formatarHorario(horario: string): string {
    const numeros = horario.replace(/\D/g, "").slice(0, 4);

    if (numeros.length === 4) {
      return `${numeros.slice(0, 2)}:${numeros.slice(2)}`;
    }

    return horario;
  }

  const hojeFormatado = formatarData(
    hoje.getDate(),
    hoje.getMonth(),
    hoje.getFullYear(),
  );

  return (
    <Layout>
      <ScreenHeader
        title="Consultas"
        subtitle="Gerencie suas consultas cadastradas."
      />

      <View style={styles.calendarioContainer}>
        <View style={styles.navegacaoMes}>
          <Pressable
            style={styles.botaoMes}
            onPress={() => mudarMes(-1)}
            accessibilityLabel="Mês anterior"
          >
            <Text style={styles.seta}>‹</Text>
          </Pressable>

          <Text style={styles.tituloMes}>
            {MESES[mesAtual]} {anoAtual}
          </Text>

          <Pressable
            style={styles.botaoMes}
            onPress={() => mudarMes(1)}
            accessibilityLabel="Próximo mês"
          >
            <Text style={styles.seta}>›</Text>
          </Pressable>
        </View>

        <View style={styles.diasSemana}>
          {DIAS_SEMANA.map((dia) => (
            <Text key={dia} style={styles.diaSemana}>
              {dia}
            </Text>
          ))}
        </View>

        <View style={styles.gradeCalendario}>
          {diasCalendario.map((dia) => {
            const hoje = hojeFormatado === dia.data;
            const possuiConsulta = temConsultaNaData(dia.data);

            return (
              <View
                key={dia.data}
                style={[
                  styles.celulaDia,
                  dia.outroMes && styles.celulaOutroMes,
                ]}
              >
                <Text
                  style={[
                    styles.numeroDia,
                    dia.outroMes && styles.numeroOutroMes,
                    hoje && styles.numeroHoje,
                  ]}
                >
                  {dia.numero}
                </Text>

                {possuiConsulta && <View style={styles.indicadorConsulta} />}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.listaContainer}>
        <Text style={styles.tituloLista}>Consultas de {MESES[mesAtual]}</Text>

        {consultasDoMes.length === 0 ? (
          <Text style={styles.semConsulta}>
            Nenhuma consulta cadastrada neste mês.
          </Text>
        ) : (
          consultasDoMes.map((consulta) => {
            const aberta = consultaSelecionada === consulta.id;

            return (
              <View key={consulta.id} style={styles.itemConsulta}>
                <Pressable
                  style={styles.resumoConsulta}
                  onPress={() => selecionarConsulta(consulta.id)}
                >
                  <View style={styles.dataConsulta}>
                    <Text style={styles.dataConsultaTexto}>
                      {formatarDataCurta(consulta.data)}
                    </Text>
                  </View>

                  <Text style={styles.tipoConsulta} numberOfLines={1}>
                    {consulta.tipoConsulta}
                  </Text>

                  <Text style={styles.setaDetalhes}>{aberta ? "⌃" : "›"}</Text>
                </Pressable>

                {aberta && (
                  <View style={styles.detalhesConsulta}>
                    <Text style={styles.detalhePrincipal}>
                      {consulta.tipoConsulta}
                    </Text>

                    <Text style={styles.detalhe}>
                      Médico: {consulta.medico}
                    </Text>

                    <Text style={styles.detalhe}>Data: {consulta.data}</Text>

                    <Text style={styles.detalhe}>
                      Horário: {formatarHorario(consulta.horario)}
                    </Text>

                    {consulta.local ? (
                      <Text style={styles.detalhe}>
                        Local: {consulta.local}
                      </Text>
                    ) : null}

                    <View style={styles.acoes}>
                      <Pressable
                        style={styles.botaoEditar}
                        onPress={() =>
                          router.push({
                            pathname: "/consultas/editar",
                            params: {
                              id: consulta.id.toString(),
                            },
                          })
                        }
                      >
                        <Text style={styles.textoBotaoEditar}>Editar</Text>
                      </Pressable>

                      <Pressable
                        style={styles.botaoExcluir}
                        onPress={() => excluirConsulta(consulta.id)}
                      >
                        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </View>
            );
          })
        )}
      </View>

      <PrimaryButton
        title="+ Nova Consulta"
        onPress={() => router.push("/consultas/novo")}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  calendarioContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },

  navegacaoMes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },

  botaoMes: {
    width: 46,
    height: 46,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  seta: {
    fontSize: 34,
    lineHeight: 38,
    color: Colors.primaryDark,
    fontWeight: "600",
  },

  tituloMes: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  diasSemana: {
    flexDirection: "row",
    marginBottom: 0,
  },

  diaSemana: {
    width: "14.2857%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: Colors.subtitle,
  },

  gradeCalendario: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  celulaDia: {
    width: "14.2857%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  celulaOutroMes: {
    opacity: 0.35,
  },

  numeroDia: {
    fontSize: Fonts.text,
    fontWeight: "600",
    color: Colors.text,
  },

  numeroOutroMes: {
    color: Colors.subtitle,
  },

  numeroHoje: {
    color: Colors.primary,
    fontWeight: "800",
  },

  indicadorConsulta: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 3,
  },

  textoLegenda: {
    fontSize: Fonts.small,
    color: Colors.subtitle,
  },

  listaContainer: {
    marginBottom: Spacing.xl,
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  semConsulta: {
    textAlign: "center",
    color: Colors.subtitle,
    fontSize: Fonts.text,
    marginVertical: Spacing.md,
  },

  itemConsulta: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    marginBottom: Spacing.sm,
    overflow: "hidden",
  },

  resumoConsulta: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },

  dataConsulta: {
    minWidth: 64,
    marginRight: Spacing.sm,
  },

  dataConsultaTexto: {
    fontSize: Fonts.text,
    fontWeight: "700",
    color: Colors.primary,
  },

  tipoConsulta: {
    flex: 1,
    fontSize: Fonts.text,
    fontWeight: "600",
    color: Colors.text,
    textTransform: "uppercase",
  },

  setaDetalhes: {
    fontSize: 30,
    color: Colors.subtitle,
    marginLeft: Spacing.sm,
  },

  detalhesConsulta: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.md,
  },

  detalhePrincipal: {
    fontSize: 19,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  detalhe: {
    fontSize: Fonts.text,
    color: Colors.text,
    marginBottom: 6,
  },

  acoes: {
    flexDirection: "row",
    marginTop: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },

  botaoEditar: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoEditar: {
    fontSize: Fonts.text,
    fontWeight: "700",
    color: Colors.primaryDark,
  },

  botaoExcluir: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoExcluir: {
    fontSize: Fonts.text,
    fontWeight: "700",
    color: "#B42318",
  },
});
