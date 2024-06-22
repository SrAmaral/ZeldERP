"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateClientRequest } from "./CreateClientRequest";
import {
  NewClientFormSchema,
  type CNPJRequestType,
  type NewClientFormSchemaType,
} from "./NewClientsTypes";

export default function NewClientForm() {
  const [findingCNPJ, setFindingCNPJ] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewClientFormSchemaType>({
    resolver: zodResolver(NewClientFormSchema),
    defaultValues: {
      cnpj: "",
      fantasyName: "",
      companyName: "",
      cnaeCode: "",
      cnaeDescription: "",
      openingDate: "",
      address: {
        streetType: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
      contactNumber: "",
      contactEmail: "",
      contacts: [{ name: "", email: "", phone: "" }],
    },
  });

  const formValues = watch();
  const cnpjWatch = watch("cnpj");

  useEffect(() => {
    if (cnpjWatch.replace(/\D/g, "").length === 14) {
      setFindingCNPJ("Buscando CNPJ...");
      fetch(
        `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjWatch.replace(/\D/g, "")}`,
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data: CNPJRequestType) => {
          if (Object.keys(data).length !== 1) {
            setFindingCNPJ("CNPJ encontrado!");
            setValue("fantasyName", data["NOME FANTASIA"]);
            setValue("companyName", data["RAZAO SOCIAL"]);
            setValue("cnaeCode", data["CNAE PRINCIPAL CODIGO"]);
            setValue("cnaeDescription", data["CNAE PRINCIPAL DESCRICAO"]);
            setValue("openingDate", data["DATA ABERTURA"]);
            setValue("address.streetType", data["TIPO LOGRADOURO"]);
            setValue("address.street", data.LOGRADOURO);
            setValue("address.number", data.NUMERO);
            setValue("address.complement", data.COMPLEMENTO);
            setValue("address.neighborhood", data.BAIRRO);
            setValue("address.city", data.MUNICIPIO);
            setValue("address.state", data.UF);
            setValue("address.zipCode", data.CEP);
            setValue(
              "contactNumber",
              `(${data.DDD}) ${data.TELEFONE.slice(0, 4)}-${data.TELEFONE.slice(4)}`,
            );
            setValue("contactEmail", data.EMAIL);
          } else {
            setFindingCNPJ("CNPJ não encontrado na base do governo!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFindingCNPJ("");
    }
  }, [cnpjWatch]);

  const addContact = () => {
    const currentContacts = getValues("contacts");
    currentContacts?.push({ name: "", email: "", phone: "" });
    setValue("contacts", currentContacts);
  };

  async function handleCreateClient(data: NewClientFormSchemaType) {
    // await api.zen.client.create();
    await CreateClientRequest(data);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateClient)}>
      <TabView>
        <TabPanel
          header="Informações da Empresa"
          contentClassName="p-fluid row-gap-6 formgrid mt-8 grid"
          leftIcon="pi pi-home mr-2"
        >
          <div className="field col-6">
            <span className="p-float-label">
              <InputMask
                id="cnpj"
                value={formValues.cnpj}
                {...register("cnpj")}
                mask="99.999.999/9999-99"
              />
              <label htmlFor="cnpj">CNPJ</label>
            </span>
            <p className="p-error">{errors.cnpj?.message}</p>
          </div>
          <div className="field col-6">
            <p
              className={`mt-3 font-bold ${findingCNPJ == "CNPJ encontrado!" ? "text-green-600" : findingCNPJ == "Buscando CNPJ..." ? "" : "text-red-400"}`}
            >
              {findingCNPJ}
            </p>
          </div>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                id="fantasyName"
                defaultValue={formValues.fantasyName}
                {...register("fantasyName")}
              />
              <label htmlFor="fantasyName">Nome Fantasia</label>
            </span>
          </div>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                id="companyName"
                defaultValue={formValues.companyName}
                {...register("companyName")}
              />
              <label htmlFor="companyName">Nome da Empresa</label>
            </span>
            <p className="p-error mt-2">{errors.companyName?.message}</p>
          </div>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                id="cnaeCode"
                defaultValue={formValues.cnaeCode}
                {...register("cnaeCode")}
              />
              <label htmlFor="cnaeCode">CNAE Codigo</label>
            </span>
          </div>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                id="cnaeDescription"
                defaultValue={formValues.cnaeDescription}
                {...register("cnaeDescription")}
              />
              <label htmlFor="cnaeDescription">CNAE Descrição</label>
            </span>
          </div>
          <div className="field col-6">
            <span className="p-float-label">
              <InputMask
                id="contactNumber"
                value={formValues.contactNumber}
                {...register("contactNumber")}
                mask="(99) 9999-9999"
              />
              <label htmlFor="openingDate">Numero para Contato</label>
            </span>
          </div>
          <div className="field col-6">
            <span className="p-float-label">
              <InputText
                id="contactEmail"
                defaultValue={formValues.contactEmail}
                {...register("contactEmail")}
              />
              <label htmlFor="openingDate">Email para Contato</label>
            </span>
          </div>
          <div className="field col-6">
            <span className="p-float-label">
              <InputMask
                id="openingDate"
                value={formValues.openingDate}
                {...register("openingDate")}
                mask="99/99/9999"
              />
              <label htmlFor="openingDate">Data de Abertura</label>
            </span>
          </div>
        </TabPanel>
        <TabPanel
          header="Endereço"
          leftIcon="pi pi-map mr-2"
          contentClassName="p-fluid row-gap-6 formgrid mt-6 grid"
        >
          <div className="field col-2">
            <span className="p-float-label">
              <InputText
                id="streetType"
                defaultValue={formValues.address?.streetType}
                {...register("address.streetType")}
              />
              <label htmlFor="streetType">Tipo de Longradouro</label>
            </span>
          </div>
          <div className="field col-10">
            <span className="p-float-label">
              <InputText
                id="street"
                defaultValue={formValues.address?.street}
                {...register("address.street")}
              />
              <label htmlFor="street">Longradouro</label>
            </span>
          </div>
          <div className="field col-2">
            <span className="p-float-label">
              <InputText
                id="number"
                defaultValue={formValues.address?.number}
                {...register("address.number")}
              />
              <label htmlFor="number">Numero</label>
            </span>
          </div>
          <div className="field col-5">
            <span className="p-float-label">
              <InputText
                id="complement"
                defaultValue={formValues.address?.complement}
                {...register("address.complement")}
              />
              <label htmlFor="complement">Complemento</label>
            </span>
          </div>
          <div className="field col-5">
            <span className="p-float-label">
              <InputText
                id="neighborhood"
                defaultValue={formValues.address?.neighborhood}
                {...register("address.neighborhood")}
              />
              <label htmlFor="neighborhood">Bairro</label>
            </span>
          </div>
          <div className="field col-4">
            <span className="p-float-label">
              <InputText
                id="city"
                defaultValue={formValues.address?.city}
                {...register("address.city")}
              />
              <label htmlFor="city">Cidade</label>
            </span>
          </div>
          <div className="field col-4">
            <span className="p-float-label">
              <InputText
                id="state"
                defaultValue={formValues.address?.state}
                {...register("address.state")}
              />
              <label htmlFor="state">Estado</label>
            </span>
          </div>
          <div className="field col-4">
            <span className="p-float-label">
              <InputText
                id="zipcode"
                defaultValue={formValues.address?.zipCode}
                {...register("address.zipCode")}
              />
              <label htmlFor="state">CEP</label>
            </span>
          </div>
        </TabPanel>
        <TabPanel header="Contatos" leftIcon="pi pi-users mr-2">
          {formValues.contacts?.map((contact, index) => (
            <div key={index} className="p-fluid row-gap-6 formgrid mt-6 grid">
              <div className="field col-4">
                <span className="p-float-label">
                  <InputText
                    id={`contacts[${index}].name`}
                    defaultValue={contact.name}
                    {...register(`contacts.${index}.name`)}
                  />
                  <label htmlFor={`contacts[${index}].name`}>Nome</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <InputText
                    id={`contacts[${index}].email`}
                    defaultValue={contact.email}
                    {...register(`contacts.${index}.email`)}
                  />
                  <label htmlFor={`contacts[${index}].email`}>Email</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <InputMask
                    id={`contacts[${index}].phone`}
                    value={contact.phone}
                    {...register(`contacts.${index}.phone`)}
                    mask="(99) 99999-9999"
                  />
                  <label htmlFor={`contacts[${index}].phone`}>Numero</label>
                </span>
              </div>
            </div>
          ))}
          <Button
            label="Adicionar contato"
            outlined
            className="mt-4 w-2"
            onClick={() => addContact()}
          ></Button>
        </TabPanel>
      </TabView>
      <div className="justify-content-end flex">
        <Button label="Criar Cliente" type="submit" className="mt-4 w-4" />
      </div>
    </form>
  );
}
